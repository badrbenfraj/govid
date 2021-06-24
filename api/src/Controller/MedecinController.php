<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Medecin;


class MedecinController extends AbstractController
{
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
    * @Route("/api/listmedecins", name="listmedecins")
    */
    public function getAllMedecins(SerializerInterface $serializer): Response
    {
       $listp=$this->getDoctrine()->getRepository(Medecin::class)->findAll();
       $jsonContent = $serializer->serialize($listp,"json");
       return new Response($jsonContent);
    }

    /**
    * @Route("/api/medecin/{id}", name="medecin")
    */
    public function getMedecin($id,SerializerInterface $serializer): Response
    {
       $medecin=$this->getDoctrine()->getRepository(Medecin::class)->find($id);
       $jsonContent = $serializer->serialize($medecin,"json");
       return new Response($jsonContent);
    }

    //http://localhost:8000/api/medecinWithFilters?id=2
    /**
    * @Route("/api/medecinWithFilters", name="medecinWithFilters")
    */
    public function getMedecinWithFilters(Request $request,SerializerInterface $serializer): Response
    {
       $medecin=$this->getDoctrine()->getRepository(Medecin::class)->find($request->get('id'));
       $jsonContent = $serializer->serialize($medecin,"json");
       return new Response($jsonContent);
    }

    /**
    * @Route("/api/addMedecin", name="addMedecin")
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
    * @Route("/api/removeMedecin/{id}", name="removeMedecin")
    */
    public function deleteMedecin(int $id,SerializerInterface $serializer): Response
    {
       $entityManager = $this->getDoctrine()->getManager();
       $medecin = $entityManager->getRepository(Medecin::class)->find($id);
       $entityManager->remove($medecin);
       $entityManager->flush();
       return new Response();
    }
}
