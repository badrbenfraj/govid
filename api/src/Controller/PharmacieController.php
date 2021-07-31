<?php

namespace App\Controller;

use FOS\RestBundle\Context\Context;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Pharmacie;
use App\Repository\PharmacieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;


class PharmacieController extends AbstractController
{

    /**
   * @var PharmacieRepository
   */
  private $PharmacieRepository;

  /**
  * @var EntityManagerInterface
  */
private $entityManager;
    /**
     * @Route("/pharmacie", name="pharmacie")
     */
public function __construct(PharmacieRepository $pharmacieRepository, EntityManagerInterface $entityManager)
  {
    $this->pharmacieRepository = $pharmacieRepository;
    $this->entityManager = $entityManager;
  }

    public function index(): Response
    {
        return $this->render('pharmacie/index.html.twig', [
            'controller_name' => 'PharmacieController',
        ]);
    }
    /**
    * @Route("pharmacies", name="pharmacies")
    */
    public function getPharmacies(SerializerInterface $serializer): Response
    {
       $listp=$this->getDoctrine()->getRepository(Pharmacie::class)->findAll();
       $jsonContent = $serializer->serialize($listp,"json");
       return new Response($jsonContent);
    }
    /**
    * @Route("/pharmacie/{id}", name="pharmacie")
    */
    public function getPharmacie($id,SerializerInterface $serializer): Response
    {
       $pharmacie=$this->getDoctrine()->getRepository(Pharmacie::class)->find($id);
       $jsonContent = $serializer->serialize($pharmacie,"json");
       return new Response($jsonContent);
    }
    /**
    * @Route("/addPharmacie", name="addPharmacie")
    */
    public function addpharmacie(Request $request,SerializerInterface $serializer) :Response {
        //récupérer le contenu de la requête envoyé
           $data=$request->getContent();
           $pharmacie = $serializer->deserialize($data, Pharmacie::class, 'json');
           $em=$this->getDoctrine()->getManager();
           $em->persist($pharmacie);
           $em->flush();
           $jsonContent = $serializer->serialize($pharmacie,"json");
           return new Response($jsonContent);
        }
    /**
    * @Route("/removePharmacie/{id}", name="removePharmacie")
    */
    public function deletePharmacie(int $id,SerializerInterface $serializer): Response
    {
       $entityManager = $this->getDoctrine()->getManager();
       $pharmacie = $entityManager->getRepository(Pharmacie::class)->find($id);
       $entityManager->remove($pharmacie);
       $entityManager->flush();
       return new Response();
    }
    /**
   * @Route("/pharmacie/update/{id}", name="updatePharmacie", methods={"POST"})
   * @param Request $request
   * @return \FOS\RestBundle\View\View
   */
  public function updatePharmacie(Request $request,SerializerInterface $serializer)
  {
    $id = $request->get('id');

    $data = json_decode($request->getContent(), true);
    $name = $data['name'];
    $description = $data['description'];
    $location = $data['location'];
    $gouvernement = $data['gouvernement'];
    $testCovid = $data['testCovid'];
    $horaire = $data['horaire'];

    $pharmacie = $this->pharmacieRepository->findOneBy([
      'id' => $id,
    ]);

    $pharmacie->setName($name);
    $pharmacie->setDescription($description);
    $pharmacie->setGouvernement($gouvernement);
    $pharmacie->setTestCovid($testCovid);
    $pharmacie->setLocation($location);
    $pharmacie->setHoraire($horaire);

    $this->entityManager->persist($pharmacie);
    $this->entityManager->flush();

    $jsonContent = $serializer->serialize($pharmacie,"json");
    return new Response($jsonContent);
  }
}
