<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Context\Context;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class SecurityController extends AbstractFOSRestController
{
  /**
   * @var UserRepository
   */
  private $userRepository;
  /**
   * @var UserPasswordEncoderInterface
   */
  private $passwordEncoder;
  /**
   * @var EntityManagerInterface
   */
  private $entityManager;

  public function __construct(UserRepository $userRepository, UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $entityManager)
  {
    $this->userRepository = $userRepository;
    $this->passwordEncoder = $passwordEncoder;
    $this->entityManager = $entityManager;
  }

  /**
     * @Route("/login", name="app_login", methods={"POST"})
     */
    public function login( Request $request)
    {


    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \Exception('Will be intercepted before getting here');
    }


  /**
   * @Route("/register", name="register")
   * @param Request $request
   * @return \FOS\RestBundle\View\View
   */
  public function register(Request $request)
  {
    $data = json_decode($request->getContent(), true);
    $email = $data['email'];
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $roles = $data['roles'];
    $password = $data['password'];

    $user = $this->userRepository->findOneBy([
      'email' => $email,
    ]);

    if (!is_null($user)) {
      return $this->view([
        'message' => 'User already exists',
        'code' => Response::HTTP_CONFLICT
      ], Response::HTTP_CONFLICT);
    }

    $user = new User();

    $user->setEmail($email);
    $user->setFirstName($firstName);
    $user->setLastName($lastName);
    $user->setRoles($roles);
    $user->setPassword(
      $this->passwordEncoder->encodePassword($user, $password)
    );

    $this->entityManager->persist($user);
    $this->entityManager->flush();

    return $this->view([
        'message' => 'User Created Successfully',
        'code' => Response::HTTP_CREATED
      ], Response::HTTP_CREATED)->setContext((new Context())->setGroups(['public']));
  }
}
