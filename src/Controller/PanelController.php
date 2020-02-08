<?php

namespace App\Controller;

use App\Entity\RecurringPayment;
use App\Entity\ReferralHistory;
use App\Entity\Request;
use App\Entity\User;
use App\Repository\RecurringPaymentsRepository;
use App\Repository\RequestRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PanelController extends AbstractController
{
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \Doctrine\ORM\NonUniqueResultException
     * @throws \LogicException
     */
    public function main()
    {

        $ch = curl_init('https://merchant.cloudpayments.ru/api/auth/login');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, '{"Status":{"Key":"Active"},"CultureName":{"Key":"ru"},"Email":"roman@alfagenesis.ru","Password":"6mgjHRv7DWWMsZA"}');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen('{"Status":{"Key":"Active"},"CultureName":{"Key":"ru"},"Email":"roman@alfagenesis.ru","Password":"6mgjHRv7DWWMsZA"}'))
        );
        $result = curl_exec($ch);
        preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $result, $matches);
        if (isset($matches)) if ($matches[0] != []) $cookie = substr($matches[0][0], 11);
        // echo $result;
        curl_close($ch);



        $doctrine = $this->getDoctrine();
        /** @var RequestRepository $requestRepository */
        $requestRepository = $doctrine->getRepository(Request::class);
        /** @var RecurringPaymentsRepository $recurringRepository */
        $recurringRepository = $doctrine->getRepository(RecurringPayment::class);
        /** @var UserRepository $userRepository */
        $userRepository = $doctrine->getRepository(User::class);
        $cloud=json_decode(getUrlContent("https://merchant.cloudpayments.ru/api/transactions/summary?PageSize=30&FromDate=2015-01-01T00%3A00%3A00%2B03%3A00&TimezoneOffset=03%3A00", $cookie));
        $cloud= ($cloud->Code ==200) ? $cloud->Result[0] : 'Cloud error';
        $cloudreq=json_decode(getUrlContent("https://merchant.cloudpayments.ru/api/subscriptions/summary?PageSize=30&FromDate=2015-01-01T00%3A00%3A00%2B03%3A00&TimezoneOffset=03%3A00", $cookie));
        $cloudreq= ($cloudreq->Code ==200) ? $cloudreq->Result->Active[0] : 'Cloud error';
        return $this->render(
            'panel/main.twig',
            [
                'totalSum' => $cloud->CompletedAmount,
                'referralSum' => $doctrine->getRepository(ReferralHistory::class)->aggregateSum(),
                'recurringSum' => $cloudreq->Amount,
                'totalAvg' => $cloud->CompletedAmount / $cloud->CompletedCount,
                'recurringSumCount' => $cloudreq->Count,
                'userBaseCount' => $cloud->CompletedCount,
                'userRefCount' => $userRepository->countReferrerNotNull()
            ]
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \LogicException
     */
    public function users()
    {
        // $data=[];
        $users=$this->getDoctrine()->getRepository(User::class)->findBy([], ['createdAt' => 'DESC']);;
        // foreach ($users as $idx => $us) {

        //   $ch = curl_init();
        //   curl_setopt($ch, CURLOPT_URL,"https://api.cloudpayments.ru/subscriptions/find");
        //   curl_setopt($ch, CURLOPT_POST, 1);
        //   curl_setopt($ch, CURLOPT_USERPWD, "pk_51de50fd3991dbf5b3610e65935d1:ecbe13569e824fa22e85774015784592");
        //   curl_setopt($ch, CURLOPT_ENCODING, 'UTF-8');
        //   curl_setopt($ch, CURLOPT_POSTFIELDS, "accountId=".$this->getUser()->getId());
        //   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //   $urrs = json_decode(curl_exec ($ch))->Model;

        //   $rrs=[];
        //   curl_close ($ch);
        //   if ($urrs) {
        //       foreach ($urrs as $urr) {
        //         if ($urr->Status=="Active")
        //         $rrs[]=[
        //             'id'=> $urr->Id,
        //             'status'=>$urr->Status,
        //             'sum'=>$urr->Amount,
        //         ];
        //       }
        //   }
        //   $hasrec= ($rrs!=[]);
        //     $data[$idx]=[
        //         "firstName"=>$us->getFirstName(),
        //         "lastName"=>$us->getlastName(),
        //         "email"=>$us->getemail(),
        //         "birthday"=>$us->getbirthday(),
        //         "Phone"=>$us->getPhone(),
        //         "CreatedAt"=>$us->getCreatedAt(),
        //         "id"=>$us->getid(),
        //         "hasrec"=>$hasrec
        //     ];
        // }
        return $this->render(
            'panel/users/users.twig',
            [
                'users' => $users
                // 'users' => $data
            ]
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \LogicException
     */
    public function requests()
    {
        /** @var RequestRepository $repository */
        $repository = $this->getDoctrine()->getRepository(Request::class);

        return $this->render(
            'panel/requests.twig',
            [
                'entities' => $repository->getRequestsWithUsers()
            ]
        );
    }
}
function getUrlContent($url, $cookie){
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
// curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);
curl_setopt($ch, CURLOPT_COOKIE, $cookie);
$data = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
return ($httpcode>=200 && $httpcode<300) ? $data : [false, $httpcode];
}

