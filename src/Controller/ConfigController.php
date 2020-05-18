<?php

namespace App\Controller;

use App\Entity\Config;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Exception\LogicException;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Range;
use Symfony\Component\Validator\Exception\ConstraintDefinitionException;
use Symfony\Component\Validator\Exception\InvalidOptionsException;
use Symfony\Component\Validator\Exception\MissingOptionsException;

class ConfigController extends AbstractController
{
    /**
     * @param Request $request
     *
     * @return Response
     * @throws \LogicException
     * @throws LogicException
     * @throws NotFoundHttpException
     * @throws ConstraintDefinitionException
     * @throws InvalidOptionsException
     * @throws MissingOptionsException
     */
    public function edit(Request $request)
    {
        $config = $this->getDoctrine()
            ->getRepository(Config::class)
            ->find(1);

        if (!$config) {
            throw $this->createNotFoundException(
                'Ошибка загрузки конфигурации'
            );
        }

        $form = $this->createFormBuilder($config)
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
                'percentDefault',
                NumberType::class,
                [
                    'constraints' => [
                        new NotBlank(),
                        new Range([
                            'min' => 0,
                            'max' => 100
                        ])
                    ]
                ]
            )
            ->add(
                'percentRecurrent',
                NumberType::class,
                [
                    'constraints' => [
                        new NotBlank(),
                        new Range([
                            'min' => 0,
                            'max' => 100
                        ])
                    ]
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
            $entityManager->persist($config);
            $entityManager->flush();
        }

        return $this->render(
            'panel/config.twig',
            [
                'config' => $config,
                'form' => $form->createView()
            ]
        );
    }
}
