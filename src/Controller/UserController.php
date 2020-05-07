<?php

namespace App\Controller;

use App\Entity\SendGridSchedule;
use App\Entity\User;
use App\Repository\UserRepository;
use LogicException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Exception\ConstraintDefinitionException;
use Symfony\Component\Validator\Exception\InvalidOptionsException;
use Symfony\Component\Validator\Exception\MissingOptionsException;

class UserController extends AbstractController
{
    /**
     * @param int $id
     * @param Request $request
     *
     * @return Response
     *
     * @throws LogicException
     * @throws \Symfony\Component\Form\Exception\LogicException
     * @throws NotFoundHttpException
     * @throws ConstraintDefinitionException
     * @throws InvalidOptionsException
     * @throws MissingOptionsException
     */
    public function edit(int $id, Request $request)
    {
        /** @var UserRepository $repository */
        $repository = $this->getDoctrine()->getRepository(User::class);
        $userList = $repository->findUserSelecting($id);

        $userData = $repository->find($id);

        if (!$userData) {
            throw $this->createNotFoundException(
                'Нет пользователя с id ' . $id
            );
        }

        $form = $this->createFormBuilder($userData)
            ->add(
                'id',
                HiddenType::class,
                [
                    'mapped' => false,
                    'constraints' => [
                        new NotBlank()
                    ]
                ]
            )
            ->add(
                'firstName',
                TextType::class,
                [
                    'constraints' => [
                        new NotBlank()
                    ]
                ]
            )
            ->add(
                'lastName',
                TextType::class,
                [
                    'constraints' => [
//                        new NotBlank()
                    ]
                ]
            )
            ->add(
                'birthday',
                DateType::class, [
                    'format' => 'dd.MM.yyyy',
                    'widget' => 'single_text',
                    'required' => false
                ]
            )
            ->add(
                'email',
                EmailType::class,
                [
                    'constraints' => [
                        new NotBlank(),
                        new Email()
                    ]
                ]
            )
            ->add(
                'rewardSum',
                NumberType::class,
                [
                    'constraints' => [
                        new NotBlank()
                    ]
                ]
            )
            ->add(
                'fundraiser',
                CheckboxType::class,
                [
                    'required' => false,
                    'label' => 'Фандрайзер',
                    'attr' => [
                        'class' => 'form-check-input'
                    ],
                ]
            )
            ->add(
                'roles',
                ChoiceType::class,
                [
                    'choices' => [
                        'ROLE_ADMIN' => 'ROLE_ADMIN',
                        'ROLE_USER' => 'ROLE_USER'
                    ],
                    'multiple' => true
                ]
            )
            ->add(
                'referrer',
                ChoiceType::class,
                [
                    'required' => false,
                    'choices' => $userList,
                    'choice_label' => function ($user) {
                        /** @var User $user */
                        return $user->getEmail();
                    }
                ]
            )
            ->add(
                'save',
                SubmitType::class,
                [
                    'label' => 'Submit',
                    'attr' => [
                        'class' => 'btn btn-primary'
                    ]
                ]
            )
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($userData);
            $entityManager->flush();
        }

        return $this->render(
            'panel/users/edit.twig',
            [
                'allUser' => $userData,
                'user' => $userData,
                'form' => $form->createView()
            ]
        );
    }

    /**
     * @param int $id
     *
     * @return RedirectResponse|Response
     * @throws LogicException
     */
    public function delete(int $id)
    {
        /** @var UserRepository $repository */
        $repository = $this->getDoctrine()->getRepository(User::class);

        $userData = $repository->find($id);

        if (!$userData) {
            throw $this->createNotFoundException(
                'Нет пользователя с id ' . $id
            );
        }
        $urrs = $userData->getRecurrent();

        $rrs = [];
        if ($urrs) {
            foreach ($urrs as $urr) {
                if ($urr->Status == "Active")
                    $rrs[] = [
                        'id' => $urr->Id
                    ];
            }
        }
        if ($rrs != []) return new Response('subs', Response::HTTP_OK, ['content-type' => 'text/html']);
        $entityManager = $this->getDoctrine()->getManager();

        // Удаляем все неотправленные письма из очереди для этого юзера
        $sgss = $entityManager->getRepository(SendGridSchedule::class)->findBy([
            'email' => $userData->getEmail(),
            'sent' => 0
        ]);

        foreach ($sgss as $sgs) {
            $entityManager->remove($sgs);
        }

        $entityManager->remove($userData);
        $entityManager->flush();
        return new Response('ok', Response::HTTP_OK, ['content-type' => 'text/html']);
        // return $this->redirect('/panel/users');
    }
}
