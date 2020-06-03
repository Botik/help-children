<?php

namespace App\Controller;

use App\Entity\Child;
use App\Entity\ChTarget;
use App\Entity\News;
use App\Service\FileUploader;
use DateTime;
use Exception;
use LogicException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Constraints\NotBlank;

class NewsController extends AbstractController
{

    /**
     * @return Response
     *
     * @throws LogicException
     */
    public function detail(int $id)
    {
        $n = $this->getDoctrine()->getRepository(News::class)->findOneById($id);
        $news = $this->getDoctrine()->getRepository(News::class)->findBy([], ['createdat' => 'DESC']);
        shuffle($news);
        return $n ? $this->render('news/detail.twig',
            [
                'news' => $news,
                'n' => $n
            ]) : $this->list();
    }

    /**
     * @return Response
     *
     * @throws LogicException
     */
    public function list()
    {
        return $this->render('news/list.twig',
            [
                'news' => $this->getDoctrine()->getRepository(News::class)->findBy([], ['createdat' => 'DESC'])
            ]);
    }

    /**
     * @param int $id
     * @param FileUploader $fileUploader
     * @param Request $request
     * @return Response
     *
     * @throws Exception
     */
    public function p_edit(int $id, FileUploader $fileUploader, Request $request)
    {
        $childs = [' ' => -1];
        foreach ($this->getDoctrine()->getRepository(Child::class)
                     ->findAll() as $child) $childs[$child->getName()] = $child->getId();

        $n = $this->getDoctrine()
            ->getRepository(News::class)
            ->find($id);

        if (!$n) {
            $n = new News();
            $n->setCreatedat(new DateTime());
        }

        $trgs = [' ' => -1];
        foreach ($this->getDoctrine()->getRepository(ChTarget::class)
                     ->findBy([], ['id' => 'DESC']) as $trg) $trgs['#' . $trg->getId() . ' ' . $trg->getName() . ' — ' . $this->getDoctrine()->getRepository(Child::class)
            ->findOneById($trg->getChild())->getName()] = $trg->getId();

        $oldimages = $n->getArPhotos();
//        if ($request->get('copy') and $request->isMethod('POST')) $n = new News();
        if ($request->get('copy') and $request->isMethod('GET')) {
            $n = clone $n;
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($n);
            $entityManager->flush();
            return $this->redirectToRoute('p_news_edit', ['id' => $n->getId()]);
        }
        $form = $this->createFormBuilder($n)
            ->add(
                'id', HiddenType::class,
                [
                    'mapped' => false
                ]
            )
            ->add('title', TextType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('descr', TextareaType::class, [
                'required' => false
            ])
            ->add('createdAt', DateTimeType::class, [
                'required' => false,
                'date_widget' => 'single_text',
                'time_widget' => 'single_text',
            ])
            ->add(
                'child', ChoiceType::class, [
                    'choices' => $childs,
                    "expanded" => false,
                    "multiple" => false
                ]
            )
            ->add(
                'trg', ChoiceType::class, [
                    'choices' => $trgs,
                    "expanded" => false,
                    "multiple" => false
                ]
            )
            ->add('photos', FileType::class, [
                'multiple' => true,
                'required' => false,
                'constraints' => [
                    new Assert\All(
                        new Assert\File([
                            'maxSize' => '5120k',
                            'mimeTypes' => [
                                'image/png',
                                'image/jpeg',
                                'image/jpg',
                                'image/gif'
                            ],
                            'mimeTypesMessage' => 'Загружаемый файл должен быть изображением в формает PNG, JPG или GIF '
                        ])
                    )
                ]
            ])
            ->add('video', TextType::class, [
                'required' => false])
            ->add('save', SubmitType::class, [
                'label' => 'Сохранить',
                'attr' => [
                    'class' => 'btn btn-primary'
                ]
            ])->getForm();
        // echo json_encode($oldimages)."\n";
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $images = $n->getPhotos();
            $arrayImg = [];
            if (!is_string($images)) foreach ($images as $image) {
                $arrayImg[] = $fileUploader->upload($image);
            }
            if (!is_string($oldimages)) foreach ($oldimages as $image) {
                $arrayImg[] = $image;
            }

            $n->setPhotos(json_encode($arrayImg));
            $n->setCreatedat($n->getCreatedat() ?? new DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($n);
            $entityManager->flush();
            return $this->p_list();
        }

        return $this->render(
            'panel/news/edit.twig',
            [
                'n' => $n,
                'form' => $form->createView(),
                'imgs' => is_string($n->getPhotos()) ? json_decode($n->getPhotos()) : $n->getPhotos()
            ]
        );
    }

    /**
     * @return Response
     *
     * @throws LogicException
     */
    public function p_list()
    {
        $c = [];
        foreach ($this->getDoctrine()->getRepository(Child::class)->findBy([], ['id' => 'DESC']) as $ch) {
            $c[$ch->getId()] = $ch->getName();
        }
        return $this->render(
            'panel/news/list.twig',
            [
                'news' => $this->getDoctrine()->getRepository(News::class)->findBy([], ['id' => 'DESC']),
                'c' => $c
            ]
        );
    }

    public function delete(int $id, Request $request)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $n = $entityManager->getRepository(News::class)->find($id);

        if (null !== $n) {
            $entityManager->remove($n);
            $entityManager->flush();
        }
        return $this->p_list();
    }

    public function delimg(int $id, $img, Request $request)
    {
        $n = $this->getDoctrine()->getRepository(News::class)->find($id);
        $nar = $n->getArPhotos();
        unset($nar[$img]);
        $n->setPhotos(json_encode($nar));
        $this->getDoctrine()->getManager()->flush();
        return $this->p_list();
    }
}
