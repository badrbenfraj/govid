<?php

namespace App\Controller;
use FOS\RestBundle\Context\Context;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\LaboratoireRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Laboratoire;
class LaboratoireController extends AbstractFOSRestController
{
     /**
   * @var LaboratoireRepository
   */
  private $LaboratoireRepository;

   /**
   * @var EntityManagerInterface
   */
  private $entityManager;

  public function __construct(LaboratoireRepository $laboratoireRepository, EntityManagerInterface $entityManager)
  {
    $this->laboratoireRepository = $laboratoireRepository;
    $this->entityManager = $entityManager;
  }
    /**
     * @Route("/laboratoire", name="laboratoire")
     */
    public function index(): Response
    {
        return $this->render('laboratoire/index.html.twig', [
            'controller_name' => 'LaboratoireController',
        ]);
    }
    /**
    * @Route("/listLaboratoires", name="listLaboratoires")
    */
    public function getAllLaboratoires(SerializerInterface $serializer): Response
    {
       $listp=$this->getDoctrine()->getRepository(Laboratoire::class)->findAll();
       $jsonContent = $serializer->serialize($listp,"json");
       return new Response($jsonContent);
    }


    /**
    * @Route("/laboratoire/{id}", name="laboratoire")
    */
    public function getLaboratoire($id,SerializerInterface $serializer): Response
    {
       $laboratoire=$this->getDoctrine()->getRepository(Laboratoire::class)->find($id);
       $jsonContent = $serializer->serialize($laboratoire,"json");
       return new Response($jsonContent);
    }

     //http://localhost:8000/laboratoire?id=1
    /**
    * @Route("/laboratoireWithFilters", name="laboratoireWithFilters")
    */
    public function getLaboratoireWithFilters(Request $request,SerializerInterface $serializer): Response
    {
       $laboratoire=$this->getDoctrine()->getRepository(Laboratoire::class)->find($request->get('id'));
       $jsonContent = $serializer->serialize($laboratoire,"json");
       return new Response($jsonContent);
    }

    /**
    * @Route("/addLaboratoire", name="addLaboratoire")
    */
    public function addLaboratoire(Request $request,SerializerInterface $serializer) :Response {
    //récupérer le contenu de la requête envoyé
       $data=$request->getContent();
       $laboratoire = $serializer->deserialize($data, Laboratoire::class, 'json');
       $em=$this->getDoctrine()->getManager();
       $em->persist($laboratoire);
       $em->flush();
       $jsonContent = $serializer->serialize($laboratoire,"json");
       return new Response($jsonContent);
    }

    /**
    * @Route("/removeLaboratoire/{id}", name="removeLaboratoire")
    */
    public function deleteLaboratoire(int $id,SerializerInterface $serializer): Response
    {
       $entityManager = $this->getDoctrine()->getManager();
       $laboratoire = $entityManager->getRepository(Laboratoire::class)->find($id);
       $entityManager->remove($laboratoire);
       $entityManager->flush();
       return new Response();
    }
 /**
   * @Route("/updateLaboratoire/{id}", name="updateLaboratoire", methods={"POST"})
   * @param Request $request
   */
  public function updateLaboratoire(Request $request, SerializerInterface $serializer)
  {
    $id = $request->get('id');
    $data = json_decode($request->getContent(), true);
    $name = $data['name'];
    $email = $data['email'];
    $adresse = $data['adresse'];
    $phoneNumber = $data['phoneNumber'];
    $gouvernorat = $data['gouvernorat'];
    $gender = $data['gender'];
    $fax = $data['fax'];
    $workingTime = $data['workingTime'];
    $laboratoire = $this->laboratoireRepository->findOneBy([
      'id' => $id,
    ]);

    $laboratoire->setName($name);
    $laboratoire->setEmail($email);
    $laboratoire->setAdresse($adresse);
    $laboratoire->setPhoneNumber($phoneNumber);
    $laboratoire->setGouvernorat($gouvernorat);
    $laboratoire->setRating($rating);
    $laboratoire->setFax($fax);
    $laboratoire->setWorkingTime($workingTime);

    $this->entityManager->persist($laboratoire);
    $this->entityManager->flush();
    $jsonContent = $serializer->serialize($laboratoire,"json");
    return new Response($jsonContent);
  }

  /**
   * @Route("/laboratoire/update/{id}", name="update_laboratoire", methods={"POST"})
   * @param Request $request
   * @return \FOS\RestBundle\View\View
   */
  public function update_laboratoire(Request $request)
  {
    $id = $request->get('id');

    $data = json_decode($request->getContent(), true);
    $name = $data['name'];
    $email = $data['email'];
    $adresse = $data['adresse'];
    $phoneNumber = $data['phoneNumber'];
    $gouvernorat = $data['gouvernorat'];
    $rating = $data['rating'];
    $fax = $data['fax'];
    $workingTime = $data['workingTime'];

    $laboratoire = $this->laboratoireRepository->findOneBy([
      'id' => $id,
    ]);

    $laboratoire->setName($name);
    $laboratoire->setEmail($email);
    $laboratoire->setAdresse($adresse);
    $laboratoire->setPhoneNumber($phoneNumber);
    $laboratoire->setGouvernorat($gouvernorat);
    $laboratoire->setRating($rating);
    $laboratoire->setFax($fax);
    $laboratoire->setWorkingTime($workingTime);
    $this->entityManager->persist($laboratoire);
    $this->entityManager->flush();

    return $this->view([
      'message' => 'Medecin Updated Successfully',
      'code' => Response::HTTP_OK
    ], Response::HTTP_OK)->setContext((new Context())->setGroups(['public']));
  }
}
