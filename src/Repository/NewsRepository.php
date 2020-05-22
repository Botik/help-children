<?php

namespace App\Repository;

use App\Entity\News;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method News|null find($id, $lockMode = null, $lockVersion = null)
 * @method News|null findOneBy(array $criteria, array $orderBy = null)
 * @method News[]    findAll()
 * @method News[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NewsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, News::class);
    }

    // /**
    //  * @return News[] Returns an array of News objects
    //  */
    
    public function findTrg()
    {

        // $val=['close'=>-1,'pmj'=>0,'rehab'=>1];
        // TODO
        /** @var EntityManager $EM */
        $EM = $this->getEntityManager();
        $DB = $EM->getConnection();

        $sql = 
        <<<sql
        SELECT * from news GROUP by child
        sql;

        // $sql = 
        // <<<sql
        // SELECT target_id, id FROM news WHERE target_id is NOT NULL and descr is NOT NULL
        // sql;

        // :<<<sql
        // SELECT * FROM children WHERE id in ( SELECT m1.child FROM ch_target m1 LEFT JOIN ch_target m2 ON (m1.child = m2.child AND m1.id < m2.id) WHERE ((m1.collected < m1.goal or (m1.collected >= m1.goal AND m1.allowclose=0)) and m2.id IS NULL  and m1.rehabilitation = :state)) ORDER BY id DESC
        // sql;
        $Q = $DB->prepare($sql);
        $Q->execute();
        $rows = $Q->fetchAll(\Doctrine\DBAL\FetchMode::ASSOCIATIVE);
        $out=[];
        // foreach ($rows as $r) {
        //     $out[$r['target_id']]=$r['id'];
        // }
        foreach ($rows as $r) {
            $out[] = $r['child']; //]=$r['id'];
        }
        return $out;
    }
    

    /*
    public function findOneBySomeField($value): ?News
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
