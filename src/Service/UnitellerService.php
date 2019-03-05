<?php

namespace App\Service;

use App\Entity\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * Class UnitellerService
 * @package App\Service
 */
class UnitellerService
{
    const SHOP_IDP = 00016117;

    const LIFE_TIME = 300;

    const SECRET_KEY = 'PrrKymMnW06gAaFH4VcnqrhS0Sb7vfuAxIWK6OSxP98rgOSTRBTHkb94vIhr0l4VZgtdm4GRwgsYA0Lg';

    private $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }

    /**
     * @param Request $req
     *
     * @return array
     * @throws \Symfony\Component\Routing\Exception\InvalidParameterException
     * @throws \Symfony\Component\Routing\Exception\MissingMandatoryParametersException
     * @throws \Symfony\Component\Routing\Exception\RouteNotFoundException
     */
    public function getFromData(Request $req)
    {
        $user = $req->getUser();
        $fields = [
            'Shop_IDP' => self::SHOP_IDP,
            'Order_IDP' => $req->getId(),
            'Subtotal_P' => $req->getSum(),
            'MeanType' => '',
            'EMoneyType' => '',
            'Lifetime' => self::LIFE_TIME,
            'Customer_IDP' => $user->getId(),
            'Card_IDP' => '',
            'IData' => '',
            'PT_Code' => '',
            'URL_RETURN' => $this->urlGenerator->generate('donate_status'),
            'URL_RETURN_OK' => $this->urlGenerator->generate('donate_ok'),
            'URL_RETURN_NO' => $this->urlGenerator->generate('donate_no'),
            'Email' => $user->getEmail(),
            'CallbackFormat' => 'json',
            'LastName' => $user->getLastName(),
            'FirstName' => $user->getFirstName(),
            'MiddleName' => $user->getMiddleName(),
            'Phone' => $user->getPhone()
        ];

        if ($req->isRecurent()) {
            $fields['IsRecurrentStart'] = 1;
        }

        $fields['Signature'] = $this->getSignature($fields);

        return $fields;
    }

    /**
     * @param array $form
     *
     * @return string
     */
    public function signatureVerification(array $form)
    {
        return strtoupper(
            md5(
                $form['Order_ID'].$form['Status'].self::SECRET_KEY
            )
        );
    }

    /**
     * @param array $data
     *
     * @return string
     */
    private function getSignature(array $data): string
    {
        $arr = [
            $data['Shop_IDP'],
            $data['Order_IDP'],
            $data['Subtotal_P'],
            $data['MeanType'] ?? '',
            $data['EMoneyType'] ?? '',
            $data['Lifetime'] ?? '',
            $data['Customer_IDP'] ?? '',
            $data['Card_IDP'] ?? '',
            $data['IData'] ?? '',
            $data['PT_Code'] ?? ''
        ];

        if (isset($data['OrderLifetime'])) {
            $arr[] = $data['OrderLifetime'];
        }

        $arr[] = self::SECRET_KEY;

        foreach ($arr as $key => $value) {
            $arr[$key] = md5($value);
        }

        return strtoupper(md5(implode('&', $arr)));
    }
}