/* eslint-disable react/no-unescaped-entities */
import React from "react";

import styles from "../../styles/terms.module.scss";

const TermsAndConditions = () => {
  return (
    <div className={styles.termsContainer}>
      <div className={styles.content}>
        <h1>Conditions Générales de Vente (CGV)</h1>
        <p className={styles.lastUpdated}>Dernière mise à jour : [Date]</p>

        <p className={styles.introduction}>
          Les présentes conditions générales de vente (CGV) régissent les ventes
          réalisées sur notre site Internet [ www.votre-site.com ], exploité par
          Kick & Style, société enregistrée en tant que micro- entreprise, et
          ayant pour numéro de SIRET : [XXXXXXX]. En passant commande sur notre
          site, vous acceptez les présentes CGV sans réserve.
        </p>

        <section>
          <h2>1. Objet</h2>
          <p>
            Les présentes conditions générales de vente (CGV) s'appliquent à
            toutes les ventes de t-shirts, sweat-shirts et hoodies
            commercialisés par Kick & Style sur notre site Internet [ www.votre-
            site.com ]. Ces CGV ont pour objet de définir les droits et
            obligations des parties dans le cadre de la vente en ligne de nos
            produits.
          </p>
        </section>

        <section>
          <h2>2. Propriété intellectuelle</h2>
          <p>
            Tous les éléments présents sur le site [ www.votre-site.com ]
            (textes, images, logos, illustrations etc.) sont réservés au titre
            du droit d'auteur, sont protégés par des droits de propriété
            intellectuelle et appartiennent à Kick & Style ou à des tiers ayant
            autorisé leur utilisation. Toute reproduction, distribution ou
            exploitation totale ou partielle non autorisée est strictement
            interdite.
          </p>
        </section>

        <section>
          <h2>3. Produits</h2>
          <p>Les produits proposés à la vente sont les suivants :</p>
          <ul>
            <li>T-shirts, sweat-shirts et hoodies.</li>
            <li>
              Les descriptions et photos des produits sont les plus fidèles
              possibles, mais n'engagent en rien le vendeur, ce dernier se
              réservant le droit de modifier les caractéristiques des produits.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Commande</h2>
          <p>
            La commande devient effective dès que l'acheteur a validé son panier
            et réglé la commande sur le site. L'acheteur recevra un email de
            confirmation récapitulant la commande et ses détails.
          </p>
          <p>
            Le client peut à tout moment vérifier, modifier ou annuler sa
            commande avant de procéder au paiement.
          </p>
        </section>

        <section>
          <h2>5. Prix</h2>
          <p>
            Les prix des produits sont indiqués en euros, hors taxes (HT), sans
            TVA applicable en France selon l'article 293 B du code general des
            impots. Les frais de livraison sont calculés et affichés au moment
            du paiement, selon la destination et le mode de livraison choisi.
          </p>
          <p>
            Les prix peuvent être modifiés à tout moment, mais les produits
            seront facturés sur la base des tarifs en vigueur au moment de la
            validation de la commande.
          </p>
        </section>

        <section>
          <h2>6. Paiement</h2>
          <p>
            Le paiement des produits peut s'effectuer par carte bancaire (Visa,
            MasterCard, etc.) via Stripe ou tout autre moyen de paiement mis à
            disposition sur le site. La transaction est sécurisée par un système
            de paiement en ligne.
          </p>
          <p>
            Le paiement est dû immédiatement lors de la commande. Aucun produit
            ne sera expédié tant que le paiement n'aura pas été effectué et
            validé.
          </p>
        </section>

        <section>
          <h2>7. Livraison</h2>
          <p>
            Les produits sont livrés à l'adresse de livraison indiquée lors de
            la commande, dans les délais précisés sur le site, généralement
            entre 3 et 5 jours ouvrés, selon la méthode de livraison choisie
            pour une livraison en FRANCE Métropolitaine. Et généralement entre 3
            et 10 jours ouvrés pour livraison à l'international.
          </p>
          <p>
            Les frais de livraison sont calculés en fonction de l'adresse de
            livraison et de la méthode choisie. Les délais de livraison sont
            indicatifs et peuvent varier en fonction de la disponibilité des
            produits et du transporteur.
          </p>
          <p>
            En cas de retard de livraison, Kick & Style ne pourra être tenu
            responsable des délais supplémentaires causés par le transporteur.
          </p>
          <p>
            La date de livraison indiquée lors de la commande est informative et
            indicative. La non observation de délais convenus pour nos
            livraisons ne peut donner lieu ni à indemnités ni à annulation. Pour
            les consommateurs, les retards de livraison peuvent donner lieu à
            annulation de commande dans les conditions prévues par l'article
            L.138-2 du Code de la Consommation. DE PLUS NOUS NE SOMMES PAS
            RESPONSABLES DES RETARDS OCCASIONNES PAR DES INTEMPÉRIES.
          </p>
          <p>
            Lors de la livraison, vous devez vous assurer que les marchandises
            sont reçues en bon état; sinon vous devez, à réception, spécifier
            sur le bon du transporteur le détail des avaries (références
            articles) et nous les confirmer par EMAIL - LETTRE RECOMMANDEE 24
            heures maximum après la livraison, passé ce délai, aucune indemnités
            ni annulation ne pourront être effectuées.
          </p>
        </section>

        <section>
          <h2>8. Droit de rétractation</h2>
          <p>
            Conformément aux articles L.221-18, article L.221-23, article
            L.221-24, article L.221-25 et suivants du Code de la consommation,
            vous disposez d'un délai de 14 jours calendaires à compter de la
            réception de votre commande pour exercer votre droit de rétractation
            sans avoir à justifier de motif ni à supporter de pénalités, à
            l'exception des frais de retour. Seul le prix du ou des produits
            achetés sera remboursé.
          </p>
          <p>
            Pour exercer ce droit, il vous suffit de nous contacter à l'adresse
            email suivante : contact.kickandstyle@gmail.com ou par courrier
            recommandé à l'adresse suivante : XXXXXXX.
          </p>
          <p>
            Les produits doivent être retournés dans leur état d'origine, non
            portés, non lavés et dans leur emballage d'origine.
          </p>
        </section>

        <section>
          <h2>9. Retours et Échanges</h2>
          <p>
            En cas de retour, l'acheteur est responsable des frais de retour,
            sauf si le produit est défectueux ou non conforme à la commande.
          </p>
          <p>
            Les produits retournés doivent être dans leur état d'origine, non
            utilisés et non endommagés. Aucun produit personnalisé (par exemple,
            avec un nom ou une image spécifique) ne peut être retourné ou
            échangé.
          </p>
          <p>
            ATTENTION, Veuillez ne pas renvoyer votre achat à l'adresse du
            fabricant.
          </p>
          <p>
            Après réception et vérification du retour, nous vous enverrons un
            e-mail pour vous informer que nous avons bien reçu votre article
            retourné. Nous vous informerons également de l'approbation ou du
            rejet de votre remboursement.
          </p>
          <p>
            Si votre remboursement est approuvé, un remboursement sera effectué
            dans un délai de 7 jours sur le compte bancaire utilisé pour la
            commande.
          </p>
        </section>

        <section>
          <h2>10. Garanties</h2>
          <p>
            Les produits proposés sont soumis à la garantie légale de conformité
            et à la garantie contre les vices cachés, conformément aux articles
            L.217-4 et suivants du Code de la consommation. En cas de produit
            défectueux, vous pouvez nous contacter à l'adresse suivante :
            XXXXXXX.
          </p>
        </section>

        <section>
          <h2>11. Responsabilité</h2>
          <p>
            Les produits proposés sont conformes à la législation française en
            vigueur. Les Tailles des produits peuvent variés de 1 à 2 cm. La
            responsabilité de KICK & STYLE ne saurait être engagée en cas de non
            respect de la législation du pays où les produits sont livrés. Il
            vous appartient de vérifier auprès des autorités locales les
            possibilités d'importation ou d'utilisation des produits que vos
            envisagez de commander.
          </p>
          <p>
            KICK & STYLE ne saurait être tenu pour responsable de l'inexécution
            du contrat conclu en cas de force majeure, de perturbation ou grève
            totale ou partielle notamment des services postaux et moyens de
            transport et/ou communications, inondation, incendie.
          </p>
          <p>
            KICK & STYLE n'encourra aucune responsabilité pour tous dommages
            indirects du fait des présentes, perte d'exploitation, perte de
            profit, perte de chance, dommages ou frais.
          </p>
          <p>
            Des liens hypertextes peuvent renvoyer vers d'autres sites que le
            site KICK & STYLE. La société dégage toute responsabilité dans le
            cas où le contenu de ces sites contreviendrait aux dispositions
            légales et réglementaires en vigueur.
          </p>
        </section>

        <section>
          <h2>13. Protection des données personnelles</h2>
          <p>
            KICK & STYLE s'engage à ne pas divulguer à des tiers les
            informations que vous lui communiquez. Celles-ci sont
            confidentielles. Elles ne seront utilisées par ses services internes
            que pour le traitement de votre commande.
          </p>
          <p>
            En conséquence, conformément à la loi informatique et libertés du 6
            janvier 1978, vous disposez d'un droit d'accès, de rectification, et
            d'opposition aux données personnelles vous concernant. Pour cela il
            suffit de nous en faire la demande en ligne ou par courrier en nous
            indiquant vos nom, prénom, adresse.
          </p>
        </section>

        <section>
          <h2>14. Litiges</h2>
          <p>
            Les présentes conditions générales de vente sont soumises au droit
            français. En cas de litige, une solution amiable sera recherchée
            avant toute action judiciaire. En l'absence d'accord amiable, les
            tribunaux français seront compétents.
          </p>
          <p>Plateforme européenne de règlement en ligne des litiges (RLL).</p>
        </section>

        <section>
          <h2>
            15. Informations concernant l'exercice du droit de rétractation pour
            les consommateurs
          </h2>
          <p className={styles.subtitle}>
            (article r. 121-2 du code de la consommation)
          </p>

          <h3>Droit de rétractation</h3>
          <p>
            Vous avez le droit de vous rétracter du présent contrat sans donner
            de motif dans un délai de quatorze jours.
          </p>
          <p>
            Le délai de rétractation expire quatorze jours après le jour où
            vous-même, ou un tiers autre que le transporteur et désigné par
            vous, prend physiquement possession du bien.
          </p>
          <p>
            Pour exercer le droit de rétractation, vous devez nous notifier
            (KICK & STYLE, préciser adresse, numéro de téléphone, numéro de
            télécopie et adresse mail) votre décision de rétractation du présent
            contrat au moyen d'une déclaration dénuée d'ambiguïté (par exemple,
            lettre envoyée par la poste, télécopie ou courrier électronique).
          </p>
          <p>
            Vous pouvez utiliser le modèle de formulaire de rétractation joint à
            notre confirmation de commande mais ce n'est pas obligatoire. Pour
            que le délai de rétractation soit respecté, il suffit que vous
            transmettiez votre communication relative à l'exercice du droit de
            rétractation avant l'expiration du délai de rétractation.
          </p>
          <p>
            Conformément à l'article L. 121-21-8 du Code de la Consommation, le
            droit de rétractation ne peut être exercé pour les biens
            confectionnés selon les spécifications du consommateur ou nettement
            personnalisés (produits gravés par exemple).
          </p>

          <h3>Effets de rétractation</h3>
          <p>
            En cas de rétractation de votre part du présent contrat, nous vous
            rembourserons tous les paiements reçus de vous, y compris les frais
            de livraison (à l'exception des frais supplémentaires découlant du
            fait que vous avez choisi, le cas échéant, un mode de livraison
            autre que le mode moins coûteux de livraison standard proposé par
            nous) sans retard excessif et, en tout état de cause, au plus tard
            quatorze jours à compter du jour où nous sommes informés de votre
            décision de rétractation du présent contrat.
          </p>
          <p>
            Nous procéderons au remboursement en utilisant le même moyen de
            paiement que celui que vous aurez utilisé pour la transaction
            initiale, sauf si vous convenez expressément d'un moyen différent;
            en tout état de cause, ce remboursement n'occasionnera pas de frais
            pour vous.
          </p>
          <p>
            Nous pouvons différer le remboursement jusqu'à ce que nous ayons
            reçu le bien ou jusqu'à ce que vous ayez fourni une preuve
            d'expédition du bien, la date retenue étant celle du premier de ces
            faits.
          </p>
          <p>
            Vous devez prendre en charge les frais directs de renvoi du bien.
          </p>
          <p>
            Votre responsabilité n'est engagée qu'à l'égard de la dépréciation
            des marchandises résultant de manipulations autres que celles
            nécessaires pour établir la nature, les caractéristiques et le bon
            fonctionnement de nos produits.
          </p>
          <p>
            Pour les consommateurs, les retards de livraison peuvent donner lieu
            à annulation de commande dans les conditions prévues par l'article
            L.138-2 du Code de la Consommation.
          </p>
        </section>

        <section>
          <h2>16. Référence commerciale</h2>
          <p>
            Sauf indication contraire expresse, KICK & STYLE est autorisé à
            utiliser la dénomination sociale, le nom commercial et/ou les
            marques (y compris les logos) du client comme référence commerciale
            sur tout support ou à toute occasion dans un but marketing et/ou
            publicitaire.
          </p>
          <p>
            CALAISFORNIA est autorisé de la même manière à représenter les
            produits fabriqués pour un client à titre d'illustration ou de
            référence commerciale sur tout support ou à toute occasion dans un
            but marketing et/ou publicitaire.
          </p>
        </section>

        <section>
          <h2>17. Mediateur</h2>
          <p>
            Aux termes de l'article L612-1 du Code de la Consommation « Tout
            consommateur a le droit de recourir gratuitement à un médiateur de
            la consommation en vue de la résolution amiable du litige qui
            l'oppose à un professionnel. A cet effet, le professionnel garantit
            au consommateur le recours effectif à un dispositif de médiation de
            la consommation.
          </p>
          <p>
            Avant de saisir le médiateur de la consommation, le consommateur
            doit déjà avoir tenté de résoudre son litige directement auprès du
            professionnel par une réclamation écrite ou avoir fait une
            réclamation selon les termes du contrat conclu avec le
            professionnel.
          </p>
          <p>
            La médiation de la consommation est un règlement extrajudiciaire des
            litiges de la consommation.
          </p>
          <p>
            Si les conditions sont réunies, une médiation de la consommation se
            déroulera selon un processus précis et selon les textes en vigueur.
            La procédure est gratuite pour le consommateur (R612-1 du Code de la
            Consommation).
          </p>
          <p>Adresse du médiateur : CM2C, 14 rue Saint Jean, 75017 PARIS</p>
        </section>

        <section>
          <h2>18. Modification des CGV</h2>
          <p>
            KICK & STYLE se réserve le droit de modifier à tout moment les
            présentes conditions générales de vente. Les modifications seront
            applicables dès leur publication sur le site [www.votre- site.com].
          </p>
        </section>

        <section>
          <h2>19. Contact</h2>
          <p>
            Pour toute question ou réclamation, vous pouvez nous contacter via :
          </p>
          <ul>
            <li>Email : contact.kickandstyle@gmail.com</li>
            <li>Téléphone : +66830502134</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
