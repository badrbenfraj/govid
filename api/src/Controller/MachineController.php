<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Machine;
use App\Entity\User;
use App\Entity\Reservation;




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
    * @Route("/listmachines", name="listmachines")
    */
    public function getAllMachines(SerializerInterface $serializer): Response
    {
      $listp=$this->getDoctrine()->getRepository(Machine::class)->findAll();
      // foreach($machine as $listp){
  // $reservation=$machine->getReservation();
  // if($reservation->getDateTo() < (new \DateTime('now')) $machine->setBooked(false);
   // }
      $jsonContent = $serializer->serialize($listp,"json", [
        'circular_reference_handler' => function ($object) {
            return $object->getId();
        }
    ]);
      return new Response($jsonContent, 200, ['Content-Type' => 'application/json']);
    }


    /**
    * @Route("/machine/{id}", name="machine")
    */
    public function getMachine($id,SerializerInterface $serializer): Response
    {
      $machine=$this->getDoctrine()->getRepository(Machine::class)->find($id);
      $jsonContent = $serializer->serialize($machine,"json", [
        'circular_reference_handler' => function ($object) {
            return $object->getId();
        }
    ]);
      return new Response($jsonContent);
    }

     //http://localhost:8000/machine?id=1
    /**
    * @Route("/machineWithFilters", name="machineWithFilters")
    */
    public function getMachineWithFilters(Request $request,SerializerInterface $serializer): Response
    {
      $machine=$this->getDoctrine()->getRepository(Machine::class)->find($request->get('id'));
       $jsonContent = $serializer->serialize($machine,"json", [
         'circular_reference_handler' => function ($object) {
             return $object->getId();
         }
     ]);
       return new Response($jsonContent);
    }

    /**
    * @Route("/addMachine", name="addMachine")
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
    * @Route("/removeMachine/{id}", name="removeMachine")
    */
    public function deleteMachine(int $id,SerializerInterface $serializer): Response
    {
       $entityManager = $this->getDoctrine()->getManager();
       $machine = $entityManager->getRepository(Machine::class)->find($id);
       $entityManager->remove($machine);
       $entityManager->flush();
       return new Response();
    }

    

    /**
     * @Route("/reservationMachine/{iduser}/{idmachine}", name="reservationMachine")
     */
    public function setRelation($iduser, $idmachine,Request $request): Response
    {
     $user = $this->getDoctrine()->getRepository(User::class)->find($iduser);
     $machine=$this->getDoctrine()->getRepository(Machine::class)->find($idmachine);

     $machine->setTenant($user);

     $dateTo = $request->get('dateTo');

     $reservation = new Reservation();
     $reservation->setDateFrom(new \DateTime('now'));
     $reservation->setDateTo(new \DateTime($dateTo));
     $reservation->setMachine($machine);
     $reservation->setUser($user);


     $machine->setReservation($reservation);
     $machine->setBooked(true);



     $entityManager = $this->getDoctrine()->getManager();
     $entityManager->persist($machine);

    
     $entityManager->flush();

     return new Response(
        'book machine with id: '.$machine->getId()
        .' and  tenant with id: '.$user->getId()
     );
    }

     /**
    * @Route("/listreservations", name="listreservations")
    */
    public function getAllReservations(SerializerInterface $serializer): Response
    {
       $listreservations=$this->getDoctrine()->getRepository(Reservation::class)->findAll();
       $jsonContent = $serializer->serialize($listreservations,"json", [
         'circular_reference_handler' => function ($object) {
             return $object->getId();
         }
     ]);
       return new Response($jsonContent, 200, ['Content-Type' => 'application/json']);
    }

   
    /**
    * @Route("/reservation/{id}", name="machine")
    */
    public function getReservations($id,SerializerInterface $serializer): Response
    {
       $reservation=$this->getDoctrine()->getRepository(Reservation::class)->find($id);
       $jsonContent = $serializer->serialize($reservation,"json", [
         'circular_reference_handler' => function ($object) {
             return $object->getId();
         }
     ]);
       return new Response($jsonContent);
    }

     //machinesByOwner?owner_id=12345
    /**
    * @Route("/machinesByOwner", name="machinesByOwner")
    */
    public function getMachinesWithFilters(Request $request,SerializerInterface $serializer): Response
    {
       $owner = $request->get('owner_id');
       $reservations=$this->getDoctrine()->getRepository(Machine::class)->search_by_owner($owner);
       $jsonContent = $serializer->serialize($reservations,"json", [
         'circular_reference_handler' => function ($object) {
             return $object->getId();
         }
     ]);
       return new Response($jsonContent);
    }

    /**
    * @Route("/reservationByUser", name="reservationByUser")
    */
    public function getReservationsByUser(Request $request,SerializerInterface $serializer): Response
    {
       $user = $request->get('user_id');
       $reservations=$this->getDoctrine()->getRepository(Reservation::class)->search_by_user($user);
       $jsonContent = $serializer->serialize($reservations,"json", [
         'circular_reference_handler' => function ($object) {
             return $object->getId();
         }
     ]);
       return new Response($jsonContent);
    }

    
    /**
    * @Route("/reservationByMachine", name="reservationByMachine")
    */
    public function getReservationsByMachine(Request $request,SerializerInterface $serializer): Response
    {
       $machine = $request->get('machine_id');
       $reservations=$this->getDoctrine()->getRepository(Reservation::class)->search_by_machine($machine);
       $jsonContent = $serializer->serialize($reservations,"json", [
         'circular_reference_handler' => function ($object) {
             return $object->getId();
         }
     ]);
       return new Response($jsonContent);
    }

}

