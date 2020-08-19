<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\NewsRepository")
 */
class News
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", fetch="LAZY")
     * @ORM\JoinColumn(name="author_id")
     */
    private $author = null;
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $category;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=50000000, nullable=true)
     */
    private $descr;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $child;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $hidden;

    /**
     * @ORM\Column(type="string", length=65356, nullable=true)
     */
    private $photos;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $video;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $target_id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdat;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(?string $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescr(): ?string
    {
        return $this->descr;
    }

    public function setDescr(?string $descr): self
    {
        $this->descr = $descr;

        return $this;
    }

    public function getHidden()
    {
        return $this->hidden==true;
    }

    public function setHidden($hidden): self
    {
        $this->hidden = $hidden;

        return $this;
    }

    public function getChild(): ?int
    {
        return $this->child;
    }

    public function setChild(?int $child): self
    {
        $this->child = $child;

        return $this;
    }

    public function getPhotos()
    {
        return $this->photos ?? '[]';
    }
    public function getArPhotos()
    {
        return json_decode( $this->photos ?? '[]');
    }

    public function setPhotos($photos): self
    {
        $this->photos = $photos;

        return $this;
    }

    public function getVideo(): ?string
    {
        return $this->video;
    }

    public function setVideo(?string $video): self
    {
        $this->video = $video;

        return $this;
    }
    public function getTrg(): ?int
    {
        return $this->target_id;
    }

    public function setTrg(?int $target_id): self
    {
        $this->target_id = $target_id;

        return $this;
    }


    public function getCreatedat()
    {
        return $this->createdat;
    }

    public function setCreatedat($createdat): self
    {
        $this->createdat = $createdat;

        return $this;
    }

    public function getAuthor()
    {
        return $this->author;
    }

    public function setAuthor($author): self
    {
        $this->author = $author;

        return $this;
    }
}
