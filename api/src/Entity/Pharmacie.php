<?php

namespace App\Entity;

use App\Repository\PharmacieRepository;
use Doctrine\ORM\Mapping as ORM;


/**
 * @ORM\Entity(repositoryClass=PharmacieRepository::class)
 */
class Pharmacie
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $testCovid;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $location;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $gouvernement;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getTestCovid(): ?string
    {
        return $this->testCovid;
    }

    public function setTestCovid(string $testCovid): self
    {
        $this->testCovid = $testCovid;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function getGouvernement(): ?string
    {
        return $this->gouvernement;
    }

    public function setGouvernement(string $gouvernement): self
    {
        $this->gouvernement = $gouvernement;

        return $this;
    }
}
