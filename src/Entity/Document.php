<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DocumentRepository")
 * @ORM\Table(name="documents")
 */
class Document
{
    const FILE_FIELD = [
        'maxSize' => '10000k',
        /*                            'mimeTypes' => [
                                        'image/png',
                                        'image/jpeg',
                                        'image/jpg',
                                        'image/gif'
                                    ],
                                    'mimeTypesMessage' => 'Загружаемый файл должен быть изображением в формает PNG, JPG или GIF ' */
    ];

    const TYPES = [
        'Финансовые отчёты'      => 'financial',
        'Аудиторские заключения' => 'auditor'
    ];

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer", options={"unsigned":true})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200)
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $category;

    /**
     * @ORM\Column(type="string")
     */
    private $file;

    public function __construct() {}

    public function getId(): ?int { return $this->id; }

    public function getTitle(): string { return (string) $this->title; }
    public function setTitle(string $title): self {
        $this->title = $title;
        return $this;
    }

    public function getDescription(): ?string { return (string) $this->description; }
    public function setDescription(?string $description): self {
        $this->description = $description;
        return $this;
    }

    public function getCategory(): string { return (string) $this->category; }
    public function setCategory(string $category): self {
        $this->category = $category;
        return $this;
    }

    public function getFile(): string { return (string) $this->file; }
    public function setFile(string $file): self {
        $this->file = $file;
        return $this;
    }
}