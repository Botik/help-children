<?php

namespace App\Controller;

use App\Entity\User;
use App\Event\DonateReminderEvent;
use App\Event\RegistrationEvent;
use App\Form\RegistrationFormType;
use App\Security\LoginFormAuthenticator;
use DateTime;
use Exception;
use LogicException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Exception\ConstraintDefinitionException;
use Symfony\Component\Validator\Exception\InvalidOptionsException;
use Symfony\Component\Validator\Exception\MissingOptionsException;
use Symfony\Component\Validator\Validation;

class RegistrationController extends AbstractController
{
    /**
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param GuardAuthenticatorHandler $guardHandler
     * @param LoginFormAuthenticator $authenticator
     * @param EventDispatcherInterface $dispatcher
     *
     * @return Response
     *
     * @throws Exception
     */
    public function register(
        Request $request,
        UserPasswordEncoderInterface $passwordEncoder,
        GuardAuthenticatorHandler $guardHandler,
        LoginFormAuthenticator $authenticator,
        EventDispatcherInterface $dispatcher
    ): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);

        if ($request->isMethod('post')) {
            $regform = $request->request->get('registration_form');
            $regform['phone'] = preg_replace(
                '/[^+0-9]/',
                '',
                $regform['phone']
            );
            $regform['phone'] = preg_replace(
                '/^[78]/',
                '+7',
                $regform['phone']
            );
            if ($regform['birthday'] !== null)
                $regform['birthday'] = DateTime::createFromFormat("d.m.Y", $regform['birthday']);
            $request->request->set('registration_form', $regform);
        }

        $form->handleRequest($request);

        $regform['birthday'] = null;
        $request->request->set('registration_form', $regform);
        $formm = $this->createForm(RegistrationFormType::class, $user);
        $formm->handleRequest($request);
        if ($form->isSubmitted()) {
            $doctrine = $this->getDoctrine();
            $valid = false;
            if ($form->isValid()) {
                /** @var User $old_user */
                $old_user = $doctrine->getRepository(User::class)->findOneBy(['email' => $user->getEmail()]);
                $valid = true;

                if ($old_user) {
                    if (!$old_user->getPass()) {
                        $user = $old_user;
                    } else {
                        $valid = false;
                        $formm->addError(new FormError('E-mail уже занят'));
                    }
                }
                $old_user = $doctrine->getManager()->createQuery("SELECT u FROM App\\Entity\\User u WHERE JSON_VALUE(u.meta, '$.phone') = " . $regform['phone'])->getResult();
                if ($old_user) {
                    $valid = false;
                    $formm->addError(new FormError('Такой номер телефона уже существует'));
                }
            }
            dd($form->getErrors(true));
            if ($valid) {
                // encode the plain password
                $user->setPass(
                    $passwordEncoder->encodePassword(
                        $user,
                        $form->get('password')->getData()
                    )
                )->setRefCode(substr(md5(random_bytes(20)), 0, 16));

                $entityManager = $doctrine->getManager();
                $entityManager->persist($user);
                $entityManager->flush();

                $dispatcher->dispatch(new RegistrationEvent($user), RegistrationEvent::NAME);

                // do anything else you need here, like send an email
                return $guardHandler->authenticateUserAndHandleSuccess(
                    $user,
                    $request,
                    $authenticator,
                    'main' // firewall name in security.yaml
                );
            }
        }
        // echo ;
        return $this->render(
            'auth/registration.twig',
            [
                'form' => $formm->createView()
            ]
        );
    }


    /**
     * @param Request $request
     * @param EventDispatcherInterface $dispatcher
     * @param GuardAuthenticatorHandler $guardHandler
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param LoginFormAuthenticator $authenticator
     *
     * @return RedirectResponse|Response
     * @throws LogicException
     * @throws ConstraintDefinitionException
     * @throws InvalidOptionsException
     * @throws MissingOptionsException
     */
    public function confirmCode(Request $request,
                                EventDispatcherInterface $dispatcher,
                                GuardAuthenticatorHandler $guardHandler,
                                UserPasswordEncoderInterface $passwordEncoder,
                                LoginFormAuthenticator $authenticator)
    {
        $form = [
            'code' => $request->query->get('code'),
            'email' => $request->query->filter('email', FILTER_VALIDATE_EMAIL)
        ];

        if (!$form['code'])
            return $this->redirect('/');

        $form_errors = $this->codeValidate($form);

        if (count($form_errors) > 0)
            return $this->redirect('/');

        $doctrine = $this->getDoctrine();

        /** @var User $user */
        $user = $doctrine->getRepository(User::class)->findOneBy([
            'ref_code' => $form['code'],
            'email' => $form['email']
        ]);

        if (!$user)
            return $this->redirect('/');


        $user->checkAfterReg($request, $passwordEncoder, $dispatcher);

        // do anything else you need here, like send an email
        return $guardHandler->authenticateUserAndHandleSuccess(
            $user,
            $request,
            $authenticator,
            'main' // firewall name in security.yaml
        );
    }

    /**
     * @param array $data
     *
     * @return ConstraintViolationListInterface
     * @throws ConstraintDefinitionException
     * @throws InvalidOptionsException
     * @throws MissingOptionsException
     */
    private function codeValidate(array $data)
    {
        return Validation::createValidator()->validate(
            $data,
            new Assert\Collection([
                'code' => new Assert\Length(['min' => 16, 'max' => 16]),
                'email' => [new Assert\NotBlank(), new Assert\Email()],
            ])
        );
    }

    public function sendConfirmCode(Request $request, EventDispatcherInterface $dispatcher)
    {
        $email = $request->request->get('email');
        if (!$email)
            return new Response('false');

        $doctrine = $this->getDoctrine();
        $user = $doctrine->getRepository(User::class)->findOneBy([
            'email' => $email
        ]);
        if (!$user || $user->getConfirmed())
            return new Response('false');

        $user->setRefCode(substr(md5(random_bytes(20)), 0, 16));
        $doctrine->getManager()->persist($user);
        $doctrine->getManager()->flush();
        $dispatcher->dispatch(new RegistrationEvent($user), RegistrationEvent::NAME);
        return new Response('true');
    }

    public function registerFundMethod(Request $request, EventDispatcherInterface $dispatcher)
    {
        $email = $request->request->get('email');
        $phone = $request->request->get('phone');
        $firstName = $request->request->get('firstName');
        $lastName = $request->request->get('lastName');
        $check = $request->request->get('check');
        $fund = $request->request->get('fund');

        $phone = preg_replace(
            '/^[78]/',
            '+7',
            $phone
        );
        if (!$email || !$phone || strlen($phone) < 10)
            return new Response('false');


        $doctrine = $this->getDoctrine();
        $user = $doctrine->getRepository(User::class)->findOneBy([
            'email' => $email
        ]);

        if ($user)
            return new Response('false (email)');
        $old_user = $doctrine->getManager()->createQuery("SELECT u FROM App\\Entity\\User u WHERE JSON_VALUE(u.meta, '$.phone') = " . $phone)->getResult();
        if ($old_user)
            return new Response('false (phone)');
        $user = new User();
        $user
            ->setFirstName($firstName)
            ->setLastName($lastName)
            ->setEmail($email)
            ->setPhone($phone)
            ->setRefCode(substr(md5(random_bytes(20)), 0, 16));


        $refer_id = substr($fund, 4);
        $refer = $doctrine->getRepository(User::class)->findOneBy([
            'id' => $refer_id
        ]);

        $user->setReferrer($refer);

        $doctrine->getManager()->persist($user);

        try {
            $doctrine->getManager()->flush();

            $dispatcher->dispatch(new RegistrationEvent($user), RegistrationEvent::NAME);

            if ($check === '1')
                $dispatcher->dispatch(new DonateReminderEvent($user), DonateReminderEvent::NAME);
        } catch (Exception $e) {
            return new Response('false');
        }

        return new Response('true');
    }
}
