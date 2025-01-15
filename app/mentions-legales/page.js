import React from "react";

import styles from "../../styles/legal.module.scss";

export default function LegalNotices() {
  return (
    <div className={styles.legalContainer}>
      <div className={styles.content}>
        <h1>Mentions Légales</h1>

        <section>
          <h2>Informations juridiques</h2>
          <ul>
            <li>Représentant légal : Mme Helene BELLICOURT</li>
            <li>KICK & STYLE</li>
            <li>SIRET : xxxxxxxxxxx</li>
            <li>Numéro TVA intracommunautaire : xxxxxxxxxxx</li>
          </ul>
        </section>

        <section>
          <h2>Siège</h2>
          <ul>
            <li>Adresse : xxxxxxxxx – 59493 Villeneuve d&apos;ascq</li>
            <li>Téléphone : +66830502134</li>
            <li>Email : contact.kickandstyle@gmail.com</li>
          </ul>
        </section>

        <section>
          <h2>Hébergement</h2>
          <p>Le site www.kickandstyle.com est hébergé par :</p>
          <ul>
            <li>OVH, SAS au capital de 10 059 500 €</li>
            <li>RCS Lille Métropole 424 761 419 00045</li>
            <li>Code APE 6202A</li>
            <li>N° TVA : xxxxxxxxxxxxxx</li>
            <li>Siège social : xxxxxxxxxxxx</li>
            <li>Directeur de la publication : xxxxxxxxxx</li>
          </ul>
        </section>

        <section>
          <h2>Crédits</h2>
          <p>
            Conception et réalisation www.pilipili-web.com, copyrights
            Calaisfornia 2021
          </p>
        </section>
      </div>
    </div>
  );
}
