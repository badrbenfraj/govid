<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Machine;


class MachineController extends AbstractController
{
    /**
     * @Route("/machine", name="machine")
     */
    public function index(): Response
    {
        return $this->render('machine/index.html.twig', [
            'controller_name' => 'MachineController',
        ]);
    }
 /**
    * @Route("/api/listmachines", name="listmachines")
    */
    public function getAllMachines(SerializerInterface $serializer): Response
    {
       $listp=$this->getDoctrine()->getRepository(Machine::class)->findAll();
       $jsonContent = $serializer->serialize($listp,"json");
       return new Response($jsonContent);
    }

   
    /**
    * @Route("/api/machine/{id}", name="machine")
    */
    public function getMachine($id,SerializerInterface $serializer): Response
    {
       $machine=$this->getDoctrine()->getRepository(Machine::class)->find($id);
       $jsonContent = $serializer->serialize($machine,"json");
       return new Response($jsonContent);
    }

     //http://localhost:8000/machine?id=1
    /**
    * @Route("/api/machineWithFilters", name="machineWithFilters")
    */
    public function getMachineWithFilters(Request $request,SerializerInterface $serializer): Response
    {
       $machine=$this->getDoctrine()->getRepository(Machine::class)->find($request->get('id'));
       $jsonContent = $serializer->serialize($machine,"json");
       return new Response($jsonContent);
    }

    /**
    * @Route("/api/addMachine", name="addMachine")
    */
    public function addMachine(Request $request,SerializerInterface $serializer) :Response {
    //récupérer le contenu de la requête envoyé
       $data=$request->getContent();
       $machine = $serializer->deserialize($data, Machine::class, 'json');
       $em=$this->getDoctrine()->getManager();
       $em->persist($machine);
       $em->flush();
       $jsonContent = $serializer->serialize($machine,"json");
       return new Response($jsonContent);
    }

    /**
    * @Route("/api/removeMachine/{id}", name="removeMachine")
    */
    public function deleteMachine(int $id,SerializerInterface $serializer): Response
    {
       $entityManager = $this->getDoctrine()->getManager();
       $machine = $entityManager->getRepository(Machine::class)->find($id);
       $entityManager->remove($machine);
       $entityManager->flush();
       return new Response();
    }

}

