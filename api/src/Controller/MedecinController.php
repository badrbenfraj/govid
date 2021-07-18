<?php

namespace App\Controller;

use FOS\RestBundle\Context\Context;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Medecin;
use App\Repository\MedecinRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;


class MedecinController extends AbstractFOSRestController
{

   /**
   * @var MedecinRepository
   */
  private $medecinRepository;

   /**
   * @var EntityManagerInterface
   */
  private $entityManager;

  public function __construct(MedecinRepository $medecinRepository, EntityManagerInterface $entityManager)
  {
    $this->medecinRepository = $medecinRepository;
    $this->entityManager = $entityManager;
  }


    /**
     * @Route("/medecin", name="medecin")
     */
    public function index(): Response
    {
        return $this->render('medecin/index.html.twig', [
            'controller_name' => 'MedecinController',
        ]);
    }

  /**
    * @Route("listmedecins", name="listmedecins")
    */
    public function getAllMedecins(SerializerInterface $serializer): Response
    {
       $listp=$this->getDoctrine()->getRepository(Medecin::class)->findAll();
       $jsonContent = $serializer->serialize($listp,"json");
       return new Response($jsonContent);
    }

    /**
    * @Route("/medecin/{id}", name="medecin")
    */
    public function getMedecin($id,SerializerInterface $serializer): Response
    {
       $medecin=$this->getDoctrine()->getRepository(Medecin::class)->find($id);
       $jsonContent = $serializer->serialize($medecin,"json");
       return new Response($jsonContent);
    }

    //http://localhost:8000/api/medecinWithFilters?id=2
    /**
    * @Route("/medecinWithFilters", name="medecinWithFilters")
    */
    public function getMedecinWithFilters(Request $request,SerializerInterface $serializer): Response
    {
       $medecin=$this->getDoctrine()->getRepository(Medecin::class)->find($request->get('id'));
       $jsonContent = $serializer->serialize($medecin,"json");
       return new Response($jsonContent);
    }

    /**
    * @Route("/addMedecin", name="addMedecin")
    */
    public function addMedecin(Request $request,SerializerInterface $serializer) :Response {
        //récupérer le contenu de la requête envoyé
           $data=$request->getContent();
           $medecin = $serializer->deserialize($data, Medecin::class, 'json');
           $em=$this->getDoctrine()->getManager();
           $em->persist($medecin);
           $em->flush();
           $jsonContent = $serializer->serialize($medecin,"json");
           return new Response($jsonContent);
        }

    /**
    * @Route("/removeMedecin/{id}", name="removeMedecin")
    */
    public function deleteMedecin(int $id,SerializerInterface $serializer): Response
    {
       $entityManager = $this->getDoctrine()->getManager();
       $medecin = $entityManager->getRepository(Medecin::class)->find($id);
       $entityManager->remove($medecin);
       $entityManager->flush();
       return new Response();
    }

 /**
   * @Route("/updateMedecin/{id}", name="updateMedecin", methods={"POST"})
   * @param Request $request
   */
  public function updateMedecin(Request $request, SerializerInterface $serializer)
  {
    $id = $request->get('id');

    $data = json_decode($request->getContent(), true);
    $fullName = $data['fullName'];
    $email = $data['email'];
    $address = $data['address'];
    $phoneNumber = $data['phoneNumber'];
    $speciality = $data['speciality'];
    $gender = $data['gender'];
    $cnamConvention = $data['cnamConvention'];

    $medecin = $this->medecinRepository->findOneBy([
      'id' => $id,
    ]);

    $medecin->setFullName($fullName);
    $medecin->setEmail($email);
    $medecin->setAddress($address);
    $medecin->setPhoneNumber($phoneNumber);
    $medecin->setSpeciality($speciality);
    $medecin->setGender($gender);
    $medecin->setCnamConvention($cnamConvention);

    $this->entityManager->persist($medecin);
    $this->entityManager->flush();
    $jsonContent = $serializer->serialize($medecin,"json");
    return new Response($jsonContent);
  }

  /**
   * @Route("/medecin/update/{id}", name="update_medecin", methods={"POST"})
   * @param Request $request
   * @return \FOS\RestBundle\View\View
   */
  public function update_medecin(Request $request)
  {
    $id = $request->get('id');

    $data = json_decode($request->getContent(), true);
    $fullName = $data['fullName'];
    $email = $data['email'];
    $address = $data['address'];
    $phoneNumber = $data['phoneNumber'];
    $speciality = $data['speciality'];
    $gender = $data['gender'];
    $cnamConvention = $data['cnamConvention'];

    $medecin = $this->medecinRepository->findOneBy([
      'id' => $id,
    ]);

    $medecin->setFullName($fullName);
    $medecin->setEmail($email);
    $medecin->setAddress($address);
    $medecin->setPhoneNumber($phoneNumber);
    $medecin->setSpeciality($speciality);
    $medecin->setGender($gender);
    $medecin->setCnamConvention($cnamConvention);

    $this->entityManager->persist($medecin);
    $this->entityManager->flush();

    return $this->view([
      'message' => 'Medecin Updated Successfully',
      'code' => Response::HTTP_OK
    ], Response::HTTP_OK)->setContext((new Context())->setGroups(['public']));
  }
}
