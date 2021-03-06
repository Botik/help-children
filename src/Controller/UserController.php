<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

class UserController extends AbstractController
{
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \LogicException
     */
    public function index()
    {
        return $this->render(
            'user/index.twig',
            [
                'users' => $this->getDoctrine()->getRepository(User::class)->findAll()
            ]
        );
    }

    /**
     * @param int     $id
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \LogicException
     * @throws \Symfony\Component\Form\Exception\LogicException
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     * @throws \Symfony\Component\Validator\Exception\ConstraintDefinitionException
     * @throws \Symfony\Component\Validator\Exception\InvalidOptionsException
     * @throws \Symfony\Component\Validator\Exception\MissingOptionsException
     */
    public function edit(int $id, Request $request)
    {
        /** @var UserRepository $repository */
        $repository = $this->getDoctrine()->getRepository(User::class);
        $userList = $repository->findUserSelecting($id);

        $userData = $repository->find($id);

        if (!$userData) {
            throw $this->createNotFoundException(
                'Нет пользователя с id '.$id
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
                        new NotBlank()
                    ]
                ]
            )
            ->add(
                'age',
                IntegerType::class,
                [
                    'constraints' => [
                        new NotBlank()
                    ]
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
}
