/* eslint-disable react/no-unescaped-entities */
import React from "react";

import styles from "../../styles/privacy.module.scss";

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyContainer}>
      <div className={styles.content}>
        <h1>Politique de Confidentialité et Utilisation des Cookies</h1>
        <p className={styles.lastUpdated}>Dernière mise à jour : [Date]</p>

        <p>
          Chez Kick and Style, nous attachons une grande importance à la
          protection de vos données personnelles. Cette politique de
          confidentialité a pour objectif de vous informer sur la manière dont
          nous collectons, utilisons et protégeons vos informations
          personnelles, ainsi que sur l'utilisation des cookies sur notre site.
        </p>

        <section>
          <h2>1. Collecte des données personnelles</h2>
          <p>
            Nous collectons vos données personnelles principalement dans le but
            de traiter vos commandes, gérer votre compte, vous fournir nos
            services, et vous tenir informés des nouveautés et promotions (si
            vous en avez fait la demande).
          </p>

          <p>Les données collectées peuvent inclure :</p>
          <ul>
            <li>Identité : Nom, prénom</li>
            <li>
              Coordonnées : Adresse postale, adresse email, numéro de téléphone
            </li>
            <li>
              Informations de paiement : Coordonnées bancaires nécessaires pour
              le paiement de vos achats
            </li>
            <li>
              Historique de commande : Produits achetés, dates des commandes,
              etc.
            </li>
            <li>
              Autres informations : Vos préférences concernant la communication,
              les informations de livraison, etc.
            </li>
          </ul>
        </section>

        <section>
          <h2>2. Utilisation des données personnelles</h2>
          <p>
            Les données personnelles que nous collectons sont utilisées
            uniquement dans le cadre de l'exploitation de notre site internet et
            de la gestion des relations commerciales avec nos clients.
          </p>
          <p>
            Nous ne revendons, ne partageons ni n'échangeons vos informations
            personnelles avec des tiers, à l'exception des prestataires de
            services nécessaires au traitement de vos commandes (comme les
            services de paiement ou de livraison).
          </p>

          <p>
            Voici les principales utilisations de vos données personnelles :
          </p>
          <ul>
            <li>Traitement et expédition de vos commandes</li>
            <li>Gestion de votre compte client</li>
            <li>
              Envoi de newsletters et de communications commerciales (si vous
              avez consenti à recevoir ces informations)
            </li>
            <li>Amélioration de nos services et de votre expérience client</li>
            <li>Réalisation de statistiques commerciales internes</li>
            <li>Respect des obligations légales et réglementaires</li>
          </ul>
        </section>

        <section>
          <h2>3. Durée de conservation des données</h2>
          <p>
            Vos données personnelles sont conservées uniquement pendant la durée
            nécessaire à la gestion de votre compte client et au traitement de
            vos commandes. Elles seront ensuite supprimées ou anonymisées
            conformément aux exigences légales.
          </p>
          <p>
            Si vous vous désinscrivez de notre newsletter, vos données liées à
            l'envoi de celle-ci seront supprimées dans un délai raisonnable
            après votre demande.
          </p>
        </section>

        <section>
          <h2>4. Sécurité des données</h2>
          <p>
            Nous mettons en place des mesures techniques et organisationnelles
            appropriées pour garantir la sécurité de vos données personnelles et
            les protéger contre toute perte, utilisation abusive, ou accès non
            autorisé.
          </p>
        </section>

        <section>
          <h2>5. Vos droits sur vos données personnelles</h2>
          <p>
            Conformément à la réglementation en vigueur (RGPD et loi
            Informatique et Libertés), vous disposez de plusieurs droits
            concernant vos données personnelles :
          </p>
          <ul>
            <li>
              Droit d'accès : Vous pouvez obtenir une copie des données
              personnelles que nous détenons à votre sujet.
            </li>
            <li>
              Droit de rectification : Vous pouvez demander à rectifier des
              informations incorrectes ou incomplètes.
            </li>
            <li>
              Droit à l'effacement : Vous pouvez demander la suppression de vos
              données personnelles, sous réserve des obligations légales.
            </li>
            <li>
              Droit d'opposition : Vous pouvez vous opposer à l'utilisation de
              vos données pour certaines finalités, notamment pour des
              communications commerciales.
            </li>
            <li>
              Droit à la portabilité : Vous pouvez demander à recevoir vos
              données dans un format structuré, couramment utilisé et lisible
              par machine, afin de les transférer à un autre responsable de
              traitement.
            </li>
          </ul>

          <p>
            Pour exercer ces droits, vous pouvez nous contacter à l'adresse
            suivante :
          </p>
          <p>Email : contact.kickandstyle@gmail.com</p>
          <p>Adresse postale : [XXXXX]</p>

          <p>
            Nous nous engageons à répondre à vos demandes dans les plus brefs
            délais, conformément aux délais légaux.
          </p>
        </section>

        <section>
          <h2>6. Utilisation des cookies</h2>
          <p>
            Lorsque vous naviguez sur notre site, nous utilisons des cookies
            pour améliorer votre expérience utilisateur. Un cookie est un petit
            fichier texte qui est enregistré sur votre appareil (ordinateur,
            tablette, smartphone) lorsque vous visitez notre site.
          </p>

          <h3>Types de cookies utilisés :</h3>
          <ul>
            <li>
              <strong>Cookies strictement nécessaires :</strong> Ces cookies
              sont indispensables au bon fonctionnement du site (par exemple,
              pour la gestion de votre panier d'achat).
            </li>
            <li>
              <strong>Cookies de performance :</strong> Ces cookies nous
              permettent de collecter des informations sur l'utilisation du site
              (par exemple, les pages visitées, la durée de la visite) afin
              d'améliorer la performance et l'expérience utilisateur.
            </li>
            <li>
              <strong>Cookies de fonctionnalité :</strong> Ces cookies
              permettent de mémoriser vos préférences et choix afin de vous
              offrir une expérience personnalisée.
            </li>
            <li>
              <strong>Cookies publicitaires :</strong> Ces cookies sont utilisés
              pour vous proposer des publicités adaptées à vos intérêts, en
              fonction de votre navigation sur notre site.
            </li>
          </ul>

          <h3>Gestion des cookies :</h3>
          <p>
            Lorsque vous accédez à notre site pour la première fois, une
            bannière vous informe de l'utilisation de cookies. Vous avez la
            possibilité d'accepter ou de refuser leur utilisation via un
            gestionnaire de cookies.
          </p>

          <h3>Comment gérer les cookies ?</h3>
          <p>
            Vous pouvez gérer vos préférences relatives aux cookies via les
            paramètres de votre navigateur. Voici comment procéder pour les
            navigateurs les plus courants :
          </p>
          <ul>
            <li>
              Google Chrome : Paramètres &gt; Confidentialité et sécurité &gt;
              Cookies et autres données de site
            </li>
            <li>
              Mozilla Firefox : Options &gt; Vie privée et sécurité &gt; Cookies
              et données de site
            </li>
            <li>
              Safari : Préférences &gt; Confidentialité &gt; Cookies et données
              de site
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Modifications de la politique de confidentialité</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de
            confidentialité à tout moment, afin de tenir compte des évolutions
            législatives, réglementaires ou techniques. Toute modification sera
            publiée sur cette page, avec une nouvelle date de mise à jour.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            Si vous avez des questions concernant notre politique de
            confidentialité ou l'utilisation de vos données personnelles,
            n'hésitez pas à nous contacter via :
          </p>
          <ul>
            <li>Email : contact.kickandstyle@gmail.com</li>
            <li>Adresse postale : [XXXXX]</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
