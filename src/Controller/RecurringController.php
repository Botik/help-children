<?php

namespace App\Controller;

use App\Entity\RecurringPayment;
use App\Entity\Request;
use App\Entity\User;
use LogicException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

class RecurringController extends AbstractController
{
    /**
     * @return Response
     *
     * @throws LogicException
     */
    public function list()
    {
        set_time_limit(60);
        $rus = $this->getDoctrine()->getRepository(Request::class)->getRecRequestsWithUsers();
        $uids = [];
        foreach ($rus as $ru) {
            if (!in_array($ru['id'], $uids)) {
                $uids[] = $ru['id'];
            }
        }
        $rrs = [];
        $dat = [];
        $channels = [];
        $multi = curl_multi_init();
        foreach ($uids as $uid) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://api.cloudpayments.ru/subscriptions/find");
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_USERPWD, $_ENV('CLOUD_PID').":".$_ENV('CLOUD_API_PASS'));
            curl_setopt($ch, CURLOPT_ENCODING, 'UTF-8');
            curl_setopt($ch, CURLOPT_POSTFIELDS, "accountId=" . $uid);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            // $urrs = json_decode(curl_exec ($ch))->Model;
            curl_multi_add_handle($multi, $ch);
            $channels[$uid] = $ch;
        }
        $active = null;
        do {
            $mrc = curl_multi_exec($multi, $active);
        } while ($mrc == CURLM_CALL_MULTI_PERFORM);

        while ($active && $mrc == CURLM_OK) {
            if (curl_multi_select($multi) == -1) {
                continue;
            }

            do {
                $mrc = curl_multi_exec($multi, $active);
            } while ($mrc == CURLM_CALL_MULTI_PERFORM);
        }
        foreach ($channels as $idx => $urrs) {
            // echo json_encode((curl_multi_getcontent($urrs)));
            $urrs = json_decode(curl_multi_getcontent($urrs))->Model;
            if ($urrs) {
                foreach ($urrs as $urr) {
                    $us = $this->getDoctrine()->getRepository(User::class)->findOneById($idx);

                    $newDtStart = substr($urr->StartDateIso, 0, 10);
                    $month = (int)substr($newDtStart, 5, 2);
                    $newDtStart = substr($newDtStart, 0, 5) . ($month > 10 ? $month - 1 : '0' . ($month - 1)) . substr($newDtStart, 7);
                    if ($month == 1) $newDtStart = ((int)substr($newDtStart, 0, 5) - 1) . '-12' . substr($newDtStart, 7);
                    $rrs[] = [
                        'uid' => $idx,
                        'mail' => $us->getEmail(),
                        'phone' => $us->getPhone(),
                        'status' => $urr->Status,
                        'sum' => $urr->Amount,
                        'dtstart' => $newDtStart,
                        'dtlast' => substr($urr->LastTransactionDateIso, 0, 10),
                        'dtnext' => substr($urr->NextTransactionDateIso, 0, 10),
                        'nsuc' => $urr->SuccessfulTransactionsNumber
                    ];
                    $dat[] = $newDtStart;
                }
            }
            curl_multi_remove_handle($multi, $channels[$idx]);
        }

        curl_multi_close($multi);


        array_multisort($dat, SORT_DESC, $rrs);
        return $this->render(
            'panel/recurringPayments/list.twig',
            [
                'rrs' => $rrs
            ]
        // 'panel/recurringPayments/list.twig',
        // [
        //     'recurring' => $this->getDoctrine()->getRepository(RecurringPayment::class)->findAll()
        // ]
        );
    }

    /**
     * @param int $id
     *
     * @return RedirectResponse
     * @throws LogicException
     */
    public function delete(int $id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $product = $entityManager->getRepository(RecurringPayment::class)->find($id);

        if (null !== $product) {
            $entityManager->remove($product);
            $entityManager->flush();
        }

        return $this->redirect('/panel/recurring');
    }
}
