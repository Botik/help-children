<?php

namespace App\Controller;

use App\Entity\Child;
use App\Entity\Document;
use App\Entity\User;
use LogicException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class MainController extends AbstractController
{
    /**
     * @return Response
     * @throws LogicException
     */
    public function main()
    {
        return $this->render('pages/main.twig',[
            'pmj' => $this->getDoctrine()->getRepository(Child::class)->getCurCh('pmj'),
        ]);
    }

    /**
     * @return Response
     * @throws LogicException
     */
    public function contacts()
    {
        return $this->render('pages/contacts.twig');
    }

    /**
     * @return Response
     * @throws LogicException
     */
    public function sms()
    {
        return $this->render('pages/sms.twig');
    }

    /**
     * @return Response
     * @throws LogicException
     */
    public function docs()
    {
        return $this->render('pages/docs.twig');
    }

    /**
     * @return Response
     * @throws LogicException
     */
    public function help()
    {
        return $this->render('pages/help.twig');
    }

    /**
     * @return Response
     * @throws LogicException
     */
    public function partners()
    {
        return $this->render('pages/partners.twig');
    }

    /**
     * @param Request $request
     * @param EventDispatcherInterface $dispatcher
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return Response
     */
    public function reports(
        Request $request,
        EventDispatcherInterface $dispatcher,
        UserPasswordEncoderInterface $passwordEncoder
    )
    {
        $email = $request->query->get('email');
        $code = $request->query->get('code');

        if (isset($code)) {
            $doctrine = $this->getDoctrine();
            $user = $doctrine->getRepository(User::class)->findOneBy([
                'ref_code' => $code,
                'email' => $email
            ]);

            if ($user) {
                $user->checkAfterReg($request, $passwordEncoder, $dispatcher);
            }
        }
        return $this->render(
            'pages/reports.twig',
            [
                'financial' => $this->getDoctrine()->getRepository(Document::class)->findBy(
                    ['category' => 'financial'],
                    ['date' => 'DESC']),
                'year' => $this->getDoctrine()->getRepository(Document::class)->findBy(
                    ['category' => 'year'],
                    ['date' => 'DESC']),
                'auditor' => $this->getDoctrine()->getRepository(Document::class)->findBy(
                    ['category' => 'auditor'],
                    ['date' => 'DESC']),
            ]
        );
    }
}
