<?php

namespace App\Listeners;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationSuccessResponse;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class AuthenticationSuccessListener
{
  private $jwtTokenTTL;

  private $cookieSecure = false;

  public function __construct($ttl)
  {
    $this->jwtTokenTTL = $ttl;
  }

  /**
   * This function is responsible for the authentication part
   *
   * @param AuthenticationSuccessEvent $event
   * @return JWTAuthenticationSuccessResponse
   */
  public function onAuthenticationSuccess(AuthenticationSuccessEvent $event)
  {
    /** @var JWTAuthenticationSuccessResponse $response */
    $response = $event->getResponse();
    $data = $event->getData();
    $tokenJWT = $data['token'];
    $event->setData($data);

    $response->headers->setCookie(new Cookie('email', $event->getUser()->getUsername(), (
    new \DateTime())
      ->add(new \DateInterval('PT' . $this->jwtTokenTTL . 'S')), '/', false, false, false));

    return $response;
  }
}
