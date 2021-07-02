<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Laboratoire;
class LaboratoireController extends AbstractController
{
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

}
