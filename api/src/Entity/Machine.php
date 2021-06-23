<?php

namespace App\Entity;

use App\Repository\MachineRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MachineRepository::class)
 */
class Machine
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $purchaseDate;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $frequency;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $debit;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $alimentation;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $saturation;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $weight;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPurchaseDate(): ?\DateTimeInterface
    {
        return $this->purchaseDate;
    }

    public function setPurchaseDate(?\DateTimeInterface $purchaseDate): self
    {
        $this->purchaseDate = $purchaseDate;

        return $this;
    }

    public function getFrequency(): ?int
    {
        return $this->frequency;
    }

    public function setFrequency(?int $frequency): self
    {
        $this->frequency = $frequency;

        return $this;
    }

    public function getDebit(): ?int
    {
        return $this->debit;
    }

    public function setDebit(?int $debit): self
    {
        $this->debit = $debit;

        return $this;
    }

    public function getAlimentation(): ?int
    {
        return $this->alimentation;
    }

    public function setAlimentation(?int $alimentation): self
    {
        $this->alimentation = $alimentation;

        return $this;
    }

    public function getSaturation(): ?int
    {
        return $this->saturation;
    }

    public function setSaturation(?int $saturation): self
    {
        $this->saturation = $saturation;

        return $this;
    }

    public function getWeight(): ?int
    {
        return $this->weight;
    }

    public function setWeight(?int $weight): self
    {
        $this->weight = $weight;

        return $this;
    }
}
