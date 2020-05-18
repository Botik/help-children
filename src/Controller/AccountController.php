<?php

namespace App\Controller;

use App\Entity\Child;
use App\Entity\RecurringPayment;
use App\Entity\SendGridSchedule;
use App\Entity\User;
use App\Event\PayoutRequestEvent;
use App\Event\RecurringPaymentRemove;
use App\Repository\RequestRepository;
use App\Repository\UserRepository;
use DateInterval;
use DateTime;
use DateTimeImmutable;
use Doctrine\ORM\NonUniqueResultException;
use Exception;
use LogicException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Exception\SuspiciousOperationException;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Exception\InvalidParameterException;
use Symfony\Component\Routing\Exception\MissingMandatoryParametersException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Exception\ConstraintDefinitionException;
use Symfony\Component\Validator\Exception\InvalidOptionsException;
use Symfony\Component\Validator\Exception\MissingOptionsException;
use Symfony\Component\Validator\Validation;
use UnexpectedValueException;

class AccountController extends AbstractController
{
    /**
     * @return Response
     *
     * @throws LogicException
     */
    public function main()
    {
        return $this->render('account/main.twig');
    }

    /**
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @param UrlGeneratorInterface $generator
     *
     * @return Response
     *
     * @throws LogicException
     * @throws SuspiciousOperationException
     * @throws InvalidParameterException
     * @throws MissingMandatoryParametersException
     * @throws RouteNotFoundException
     * @throws AccessDeniedException
     * @throws ConstraintDefinitionException
     * @throws InvalidOptionsException
     * @throws MissingOptionsException
     * @throws Exception
     */
    public function myAccount(
        Request $request,
        UserPasswordEncoderInterface $encoder,
        UrlGeneratorInterface $generator
    )
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $user = $this->getUser();
        $form = [
            'firstName' => trim($request->request->get('firstName', '')),
            'lastName' => trim($request->request->get('lastName', '')),
            'birthday' => $request->request->get('birthday', ''),
            'phone' => preg_replace(
                '/[^+0-9]/',
                '',
                $request->request->get('phone', '')
            ),
            'email' => trim($request->request->filter('email', '', FILTER_VALIDATE_EMAIL)),
            'oldPassword' => trim($request->request->filter('oldPassword', '')),
            'password' => trim($request->request->filter('password', '')),
            'retypePassword' => trim($request->request->filter('retypePassword', ''))
        ];

        $form_errors = [];
        $errors = null;

        if ($request->isMethod('post')) {
            $form_errors = $this->validate($form);
            // $puser = $this->doctrine->getManager()->createQuery("SELECT u FROM App\\Entity\\User u WHERE JSON_VALUE(u.meta, '$.phone') = ". $data['phone'])->getOneOrNullResult();
            // $phoneEr=
            if (!$encoder->isPasswordValid($user, $form['oldPassword']))
                $errors[] = 'Неверный текущий пароль';
            $current_user = $this->getUser();
            $current_email = $current_user->getEmail();
            if ($form['email'] !== $current_email) {
                $doctrine = $this->getDoctrine();
                $user1 = $doctrine->getRepository(User::class)->findOneBy([
                    'email' => $form['email']
                ]);
                if ($user1) {
                    $errors[] = 'Email уже зарегистрирован';
                    return $this->render('account/myAccount.twig', [
                        'userData' => $user,
                        'errors' => $errors,
                        'formErrors' => $form_errors,
                        'referral_url' => $request->getScheme()
                            . '://'
                            . idn_to_utf8($request->getHost())
                            . $generator->generate('referral', ['id' => $this->getUser()->getId()])
                    ]);
                }
                $doctrine->getManager()->getRepository(SendGridSchedule::class)->changeEmail($current_email, $form['email']);
                $user->setConfirmed(0);
            }
            $current_phone = $current_user->getPhone();
            if ($form['phone'] !== $current_phone) {
                $doctrine = $this->getDoctrine();
                $user1 = $doctrine->getManager()->createQuery("SELECT u FROM App\\Entity\\User u WHERE JSON_VALUE(u.meta, '$.phone') = " . $form['phone'])->getOneOrNullResult();
                if ($user1) {
                    $errors[] = 'Номер телефона уже зарегистрирован';
                    return $this->render('account/myAccount.twig', [
                        'userData' => $user,
                        'errors' => $errors,
                        'formErrors' => $form_errors,
                        'referral_url' => $request->getScheme()
                            . '://'
                            . idn_to_utf8($request->getHost())
                            . $generator->generate('referral', ['id' => $this->getUser()->getId()])
                    ]);
                }
            }

            if ($form_errors->count() === 0 && $encoder->isPasswordValid($user, $form['oldPassword'])) {
                $user->setFirstName($form['firstName'])
                    ->setLastName($form['lastName'])
                    ->setBirthday($form['birthday'] !== '' ? new DateTime($form['birthday']) : null)
                    ->setPhone($form['phone'])
                    ->setEmail($form['email']);

                $errors[] = 'Данные сохранены';

                if (!empty($form['password'])) {
                    if ($form['password'] == $form['retypePassword']) {
                        $user->setPass($encoder->encodePassword($user, $form['password']));
                        $errors[] = 'Пароль успешно изменён';
                    } else
                        $errors[] = 'Новые пароли не совпадают';
                }

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($user);
                $entityManager->flush();
            }
        }

        return $this->render('account/myAccount.twig', [
            'userData' => $user,
            'errors' => $errors,
            'formErrors' => $form_errors,
            'referral_url' => $request->getScheme()
                . '://'
                . idn_to_utf8($request->getHost())
                . $generator->generate('referral', ['id' => $this->getUser()->getId()])
        ]);
    }

    /**
     * @param array $data
     *
     * @return ConstraintViolationListInterface
     *
     * @throws ConstraintDefinitionException
     * @throws InvalidOptionsException
     * @throws MissingOptionsException
     */
    private function validate(array $data)
    {
        return Validation::createValidator()->validate(
            $data,
            new Assert\Collection([
                'firstName' => [new Assert\NotBlank(), new Assert\Length(['min' => 3, 'max' => 256])],
                'lastName' => [new Assert\Length(['min' => 2, 'max' => 256])],
                'birthday' => [],
                'phone' => new Assert\Regex(['pattern' => '/^\+?\d{10,13}$/i']),
                'email' => new Assert\NotBlank(),
                'oldPassword' => [new Assert\NotBlank(), new Assert\Length(['min' => 6, 'max' => 64])],
                'password' => [
                    new Assert\Length(['min' => 0, 'max' => 64]),
                    new Assert\EqualTo(['propertyPath' => 'retypePassword'])
                ],
                'retypePassword' => new Assert\Length(['min' => 0, 'max' => 64])
            ])
        );
    }

    /**
     * @return Response
     *
     * @throws LogicException
     * @throws AccessDeniedException
     */
    public function history()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        /** @var RequestRepository $repository */
        $repository = $this->getDoctrine()->getRepository(\App\Entity\Request::class);

        return $this->render(
            'account/history.twig',
            [
                'entities' => $repository->findRequestsDonateWithUser($this->getUser())
            ]
        );
    }

    public function downloadImage(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $result_path = $this->getRealPath($this->getUser());

        return $this->render(
            'account/downloadImage.twig',
            [
                'imagePath' => $result_path
            ]
        );
    }

    /**
     * @param User $user
     * @return string
     */
    function getRealPath($user)
    {
        $real_path = '/images/results/' . $user->getResultHash() . '.jpg';
        return $real_path;
    }

    /**
     * @param Request $request
     * @param UrlGeneratorInterface $generator
     *
     * @return Response
     * @throws LogicException
     * @throws SuspiciousOperationException
     * @throws InvalidParameterException
     * @throws MissingMandatoryParametersException
     * @throws RouteNotFoundException
     * @throws AccessDeniedException
     * @throws NonUniqueResultException
     * @throws \Doctrine\DBAL\DBALException
     */
    public function referrals(Request $request, UrlGeneratorInterface $generator)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        /** @var UserRepository $repository */
        $repository = $this->getDoctrine()->getRepository(User::class);

        $this->updateResults($this->getUser());
        $result_path = $this->getRealPath($this->getUser());

        return $this->render(
            'account/referrals.twig',
            [
                'users' => $repository->findReferralsWithSum($this->getUser()),
                'result_path' => $result_path,
                'referral_url' => $request->getScheme()
                    . '://'
                    . idn_to_utf8($request->getHost())
                    . $generator->generate('referral', ['id' => $this->getUser()->getId()])
            ]
        );
    }

    /**
     * @param User $user
     * @return bool|void
     * @throws NonUniqueResultException
     * @throws \Doctrine\DBAL\DBALException
     */
    function updateResults($user)
    {
        $name = $user->getFirstName() . ' ' . $user->getLastName() . ',';

        $repository = $this->getDoctrine()->getRepository(\App\Entity\Request::class);
        $donate = $this->getTotalDonate($user);
        // Символ тот, в шрифте посажен не туда
        $donateSum = '+ ' . round($donate) . ' ¤';
        // Выводим общее число нуждающихся детей
        /** @var RequestRepository $history_repository */
        $history_repository = $this->getDoctrine()->getRepository(\App\Entity\Request::class);
        $childCount = $history_repository->getChildrenSuccessPaymentWithUser($user->getId());
        $referrCount = $repository->aggregateCountReferWithUser($user);
        if ($childCount == 0 && $donate !== 0) $childCount = $this->getDoctrine()->getRepository(Child::class)->aggregateTotalCountChild();
        $hash = $this->getResultHash($user->getId(), $donateSum, $childCount, $referrCount, $name);

        if ($user->getResultHash() === $hash) {
            $path = $this->getResultPath($hash);
            if (file_exists($path))
                return;
        }

        $this->removeOldResultImage($user->getResultHash());
        $path = $this->getResultPath($hash);

        $success = $this->updateResultImage($name, $donateSum, $childCount, $referrCount, $path);
        if ($success) {
            $user->setResultHash($hash);
            $this->getDoctrine()->getManager()->persist($user);
            $this->getDoctrine()->getManager()->flush();
        }

        return true;
    }

    /**
     * @param $user
     * @return float|int
     * @throws NonUniqueResultException
     */
    function getTotalDonate($user)
    {
        $repository = $this->getDoctrine()->getRepository(\App\Entity\Request::class);
        $userDonate = $repository->aggregateSumSuccessPaymentWithUser($user);
        $repository = $this->getDoctrine()->getRepository(User::class);
        $referrals = $repository->findReferralsWithSum($user);
        $refDonate = 0;
        foreach ($referrals as $referral) {
            $refDonate += $referral['donate'];
        }
        $total = $userDonate + $refDonate;
        return $total;
    }

    private function getResultHash($id, $donateSum, $childCount, $referCount, $name)
    {
        return md5('hash result' . $id . $donateSum . $childCount . $referCount . $name);
    }

    private function getResultPath($hash)
    {
        return './images/results/' . $hash . '.jpg';
    }

    private function removeOldResultImage($hash)
    {
        $path = $this->getResultPath($hash);
        if (file_exists($path))
            unlink($path);
    }

    private function updateResultImage($name, $donateSum, $childCount, $referrCount, $path)
    {
        $font = './fonts/MuseoSans Cyrillic/MuseoSansCyrl-700.otf';
        $template_path = './images/account-results.jpg';
        // $font =realpath( '.\fonts\MuseoSans Cyrillic\MuseoSansCyrl-700.otf');
        // $template_path = '.\images\account-results.jpg';

        $image = imagecreatefromjpeg($template_path);

        $color_name = imagecolorallocate($image, 255, 255, 255);
        $w_name = 210; //ширина
        $h_name = 375; //высота

        if (mb_strlen($name) > 21) {
            $name = str_replace(' ', "\n", $name);
            $h_name -= 50;
        }

        $color = imagecolorallocate($image, 255, 173, 4);
        $w_donate = 210;
        $h_donate = 840;

        $w_child = 525 - 80 * strlen($childCount);
        $h_child = 1040;

        $w_refer = 360 - 105 * strlen($referrCount);
        $h_refer = 1280;

        ImageFTtext($image, 50, 0, $w_name, $h_name, $color_name, $font, $name);
        ImageFTtext($image, 95, 0, $w_donate, $h_donate, $color, $font, $donateSum);
        ImageFTtext($image, 115, 0, $w_child, $h_child, $color, $font, $childCount);
        ImageFTtext($image, 198, 0, $w_refer, $h_refer, $color, $font, $referrCount);
        Header("Content-type: image/jpeg"); //указываем на тип передаваемых данных
        Imagejpeg($image, $path); //сохраняем рисунок в формате JPEG
        ImageDestroy($image); //освобождаем память и закрываем изображение
        return true;
    }

    /**
     * @return Response
     * @throws LogicException
     * @throws UnexpectedValueException
     */
    public function recurrent()
    {
        $urrs = $this->getUser()->getRecurrent();

        $rrs = [];
        if ($urrs) {
            foreach ($urrs as $urr) {
                if (($urr->Status == "Active") or ($urr->Status == "PastDue"))
                    $rrs[] = [
                        'id' => $urr->Id,
                        'status' => $urr->Status,
                        'sum' => $urr->Amount,
                    ];
            }
        }
        return $this->render(
            'account/recurrent.twig',
            [
                'payments' => $rrs
            ]
        );
    }

    /**
     * @param int $id
     * @param Request $request
     * @param UrlGeneratorInterface $generator
     * @param EventDispatcherInterface $dispatcher
     *
     * @return RedirectResponse
     * @throws LogicException
     * @throws NotFoundHttpException
     * @throws InvalidParameterException
     * @throws MissingMandatoryParametersException
     * @throws RouteNotFoundException
     * @throws Exception
     */
    public function recurrent_remove(
        $id,
        Request $request,
        UrlGeneratorInterface $generator,
        EventDispatcherInterface $dispatcher
    )
    {
        if (!$this->isCsrfTokenValid('delete-item', $request->request->get('token'))) {
            return $this->redirect($generator->generate('account_recurrent'));
        }

        $doctrine = $this->getDoctrine();
         /** @var RecurringPayment $payment */
        $payment = $doctrine->getRepository(RecurringPayment::class)->findOneByUser($this->getUser()->getId());
        $SubscriptionsId = $id;
        if (trim($SubscriptionsId)) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://api.cloudpayments.ru/subscriptions/cancel");
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_USERPWD, $this->getEnv('CLOUD_PID').":".$this->getEnv('CLOUD_API_PASS'));
            curl_setopt($ch, CURLOPT_ENCODING, 'UTF-8');
            curl_setopt($ch, CURLOPT_POSTFIELDS, "Id=" . $SubscriptionsId);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $server_output = curl_exec($ch);

            curl_close($ch);
            $json = json_decode($server_output);
            if ($json->Success) {
                // удаление оплаты на сайте (в базе)
                $entityManager = $doctrine->getManager();

                // удаление соответствующего письма №10
                if ($payment) {
                    $mail_date = DateTimeImmutable::createFromMutable(
                        (new DateTime($payment->getCreatedAt()->format('Y-m-d')))
                            ->add(new DateInterval('P28D'))
                            ->setTime(12, 0, 0));
                    $email = $this->getUser()->getEmail();
                    $template_id = 'd-1836d6b43e9c437d8f7e436776d1a489';

                    $sgs_ten = $entityManager->getRepository(SendGridSchedule::class)->findOneBy([
                        'email' => $email,
                        'sendAt' => $mail_date,
                        'template_id' => $template_id
                    ]);

                    if ($sgs_ten)
                        $entityManager->remove($sgs_ten);

                    $payment->setDelAt(new DateTime());

                    /** @noinspection PhpMethodParametersCountMismatchInspection */
                    $dispatcher->dispatch(new RecurringPaymentRemove($payment), RecurringPaymentRemove::NAME);
                    $entityManager->flush();
                }
            }
        }
        return $this->redirect($generator->generate('account_recurrent'));
    }

    public function sendPayoutRequest(Request $request, EventDispatcherInterface $dispatcher)
    {
        $email = $request->request->get('email');
        if (!$email)
            return new Response('false');

        $doctrine = $this->getDoctrine();
        $user = $doctrine->getRepository(User::class)->findOneBy([
            'email' => $email
        ]);
        if (!$user)
            return new Response('false');

        /** @noinspection PhpMethodParametersCountMismatchInspection */
        $dispatcher->dispatch(new PayoutRequestEvent($user), PayoutRequestEvent::NAME);
        return new Response('true');
    }
}
