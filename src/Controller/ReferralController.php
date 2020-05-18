<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Exception\InvalidParameterException;
use Symfony\Component\Routing\Exception\MissingMandatoryParametersException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ReferralController extends AbstractController
{
    /**
     * @param int $id
     * @param SessionInterface $session
     * @param UrlGeneratorInterface $generator
     *
     * @return RedirectResponse
     * @throws InvalidParameterException
     * @throws MissingMandatoryParametersException
     * @throws RouteNotFoundException
     */
    public function devourer(int $id, SessionInterface $session, UrlGeneratorInterface $generator)
    {
        $response = new RedirectResponse($generator->generate('donate', [
            'ref-code' => 'fand' . $id
        ]));

        if ($id > 0) {
            $session->set('referral', $id);
            $response->headers->setCookie(new Cookie('referral', $id));
        }

        return $response;
    }
}
