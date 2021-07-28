<?php

namespace App\Entity;

use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CommentRepository::class)
 */
class Comment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $text;

    /**
     * @ORM\Column(type="datetime")
     */
    private $updateDate;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     */
    private $creatorName;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     */
    private $creatorMail;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getUpdateDate(): ?\DateTimeInterface
    {
        return $this->updateDate;
    }

    public function setUpdateDate(\DateTimeInterface $updateDate): self
    {
        $this->updateDate = $updateDate;

        return $this;
    }

    public function getCreatorName(): ?string
    {
        return $this->creatorName;
    }

    public function setCreatorName(?string $creatorName): self
    {
        $this->creatorName = $creatorName;

        return $this;
    }

    public function getCreatorMail(): ?string
    {
        return $this->creatorMail;
    }

    public function setCreatorMail(?string $creatorMail): self
    {
        $this->creatorMail = $creatorMail;

        return $this;
    }
}
