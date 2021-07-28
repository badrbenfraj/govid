<?php

namespace App\Controller;

use FOS\RestBundle\Context\Context;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\CommentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Comment;
class CommentController extends AbstractFOSRestController
{/**
   * @var CommentRepository
   */
  private $CommentRepository;

    /**
    * @var EntityManagerInterface
    */
   private $entityManager;
 
   public function __construct(CommentRepository $commentRepository, EntityManagerInterface $entityManager)
   {
     $this->commentRepository = $commentRepository;
     $this->entityManager = $entityManager;
   }
    /**
     * @Route("/comment", name="comment")
     */
    public function index(): Response
    {
        return $this->render('comment/index.html.twig', [
            'controller_name' => 'CommentController',
        ]);
    }
      /**
    * @Route("/listComments", name="listComments")
    */
    public function getAllComments(SerializerInterface $serializer): Response
    {
       $listp=$this->getDoctrine()->getRepository(Comment::class)->findAll();
       $jsonContent = $serializer->serialize($listp,"json");
       return new Response($jsonContent);
    }

    
    /**
    * @Route("/addComment", name="addComment")
    */
    public function addComment(Request $request,SerializerInterface $serializer) :Response {
        //récupérer le contenu de la requête envoyé
           $data=$request->getContent();
           $comment = $serializer->deserialize($data, Comment::class, 'json');
           $em=$this->getDoctrine()->getManager();
           $em->persist($comment);
           $em->flush();
           $jsonContent = $serializer->serialize($comment,"json");
           return new Response($jsonContent);
        }
       /**
    * @Route("/removeComment/{id}", name="removeComment")
    */
    public function deleteComment(int $id,SerializerInterface $serializer): Response
    {
       $entityManager = $this->getDoctrine()->getManager();
       $comment = $entityManager->getRepository(Comment::class)->find($id);
       $entityManager->remove($comment);
       $entityManager->flush();
       return new Response();
    }

    
}
