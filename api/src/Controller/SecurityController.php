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
use Symfony\Component\Security\Core\Security;

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
  /**
   * @var Security
   */
  private $security;

  public function __construct(Security $security, UserRepository $userRepository, UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $entityManager)
  {
    $this->userRepository = $userRepository;
    $this->passwordEncoder = $passwordEncoder;
    $this->entityManager = $entityManager;
    $this->security = $security;

  }

  /**
   * @Route("/login", name="app_login", methods={"POST"})
   */
  public function login(Request $request) {}

  /**
   * @Route("/user/me", name="current_user", methods={"GET"})
   * * @return \FOS\RestBundle\View\View
   */
  public function current_user()
  {
    $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

    $user = $this->getUser();
    return $this->view($user,Response::HTTP_OK);
  }

  /**
   * @Route("/user/update/{id}", name="update_user", methods={"POST"})
   * @param Request $request
   * @return \FOS\RestBundle\View\View
   */
  public function update_user(Request $request)
  {
    $id = $request->get('id');

    $data = json_decode($request->getContent(), true);
    $email = $data['email'];
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $password = $data['password'];

    $user = $this->userRepository->findOneBy([
      'id' => $id,
    ]);

    $user->setEmail($email);
    $user->setFirstName($firstName);
    $user->setLastName($lastName);
    $user->setPassword(
      $this->passwordEncoder->encodePassword($user, $password)
    );

    $this->entityManager->persist($user);
    $this->entityManager->flush();

    return $this->view([
      'message' => 'User Updated Successfully',
      'code' => Response::HTTP_OK
    ], Response::HTTP_OK)->setContext((new Context())->setGroups(['public']));
  }

  /**
   * @Route("/user/{email}", name="user", methods={"GET"})
   * @param Request $request
   * @return \FOS\RestBundle\View\View
   */
  public function user(Request $request)
  {
    $email = $request->get('email');
    $user = $this->userRepository->findOneBy(['email' => $email]);
    if (is_null($user)) {
      return $this->view([
        'message' => 'User Not Found.',
        'code' => Response::HTTP_NOT_FOUND
      ], Response::HTTP_NOT_FOUND);
    }
    return $this->view($user, Response::HTTP_OK);
  }

  /**
   * @Route("/user/profile/{email}", name="user_profile", methods={"POST"})
   * @param Request $request
   * @return \FOS\RestBundle\View\View
   */
  public function user_profile(Request $request): \FOS\RestBundle\View\View
  {
    $userEmail = $request->get('email');

    $data = json_decode($request->getContent(), true);
    $email = $data['email'];
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $password = $data['password'];
    $address = $data['address'];
    $country = $data['country'];
    $postal_code = $data['postal_code'];
    $city = $data['city'];

    $user = $this->userRepository->findOneBy(['email' => $userEmail]);
    if (is_null($user)) {
      return $this->view([
        'message' => 'User Not Found.',
        'code' => Response::HTTP_NOT_FOUND
      ], Response::HTTP_NOT_FOUND);
    }

    $user->setEmail($email);
    $user->setFirstName($firstName);
    $user->setLastName($lastName);
    $user->setPassword(
      $this->passwordEncoder->encodePassword($user, $password)
    );
    $user->setAddress($address);
    $user->setCountry($country);
    $user->setPostalCode($postal_code);
    $user->setCity($city);



    $this->entityManager->persist($user);
    $this->entityManager->flush();

    return $this->view([
      'message' => 'User Updated Successfully',
      'code' => Response::HTTP_OK
    ], Response::HTTP_OK)->setContext((new Context())->setGroups(['public']));
  }

  /**
   * @Route("/agent/{id}", name="userId", methods={"GET"})
   * @param Request $request
   * @return \FOS\RestBundle\View\View
   */
  public function userId(Request $request)
  {
    $id = $request->get('id');
    $user = $this->userRepository->findOneBy(['id' => $id]);
    $user->setPassword('');
    if (is_null($user)) {
      return $this->view([
        'message' => 'User Not Found.',
        'code' => Response::HTTP_NOT_FOUND
      ], Response::HTTP_NOT_FOUND);
    }
    return $this->view($user, Response::HTTP_OK);
  }

  /**
   * @Route("/users/{role}", name="usersRole", methods={"GET"})
   * @param Request $request
   * @return \FOS\RestBundle\View\View
   */
  public function users(Request $request)
  {
    $role = $request->get('role');
    $users = $this->userRepository->findByRole($role);

    return $this->view($users, Response::HTTP_OK);
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

  /**
   * @Route("/user/delete/{id}", name="delete_user", methods={"DELETE", "POST"})
   * @param Request $request
   * @return \FOS\RestBundle\View\View
   */
  public function delete_user(Request $request)
  {
    $id = $request->get('id');
    $user = $this->userRepository->findOneBy(['id' => $id]);
    $this->entityManager->remove($user);
    $this->entityManager->flush();

    return $this->view([
      'message' => 'User deleted Successfully.',
      'code' => Response::HTTP_OK
    ], Response::HTTP_OK);
  }
}
