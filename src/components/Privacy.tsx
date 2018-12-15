import { FunctionComponent } from "react";
import Markdown from "react-remarkable";

export const Privacy: FunctionComponent = () => {
  return (
    <Markdown>{`
# Privacy Policy

Personal data (usually referred to just as "data" below) will only be processed by us to the extent necessary and for the purpose of providing a functional and user-friendly website, including its contents, and the services offered there.

Per Art. 4 No. 1 of Regulation (EU) 2016/679, i.e. the General Data Protection Regulation (hereinafter referred to as the "GDPR"), "processing" refers to any operation or set of operations such as collection, recording, organization, structuring, storage, adaptation, alteration, retrieval, consultation, use, disclosure by transmission, dissemination, or otherwise making available, alignment, or combination, restriction, erasure, or destruction performed on personal data, whether by automated means or not.

The following privacy policy is intended to inform you in particular about the type, scope, purpose, duration, and legal basis for the processing of such data either under our own control or in conjunction with others. We also inform you below about the third-party components we use to optimize our website and improve the user experience which may result in said third parties also processing data they collect and control.

## I. Information about us as controllers of your data
The party responsible for this website (the "controller") for purposes of data protection law is:

Nicolas Schabram ※ Suttnerstraße 12 ※ D-22765 Hamburg

Telephone: +49 40 72379910

E-Mail: <mail@nicolasschabram.de>

## II. The rights of users and data subjects
With regard to the data processing to be described in more detail below, users and data subjects have the right

* to confirmation of whether data concerning them is being processed, information about the data being processed, further information about the nature of the data processing, and copies of the data (cf. also Art. 15 GDPR);
* to correct or complete incorrect or incomplete data (cf. also Art. 16 GDPR);
* to the immediate deletion of data concerning them (cf. also Art. 17 DSGVO), or, alternatively, if further processing is necessary as stipulated in Art. 17 Para. 3 GDPR, to restrict said processing per Art. 18 GDPR;
* to receive copies of the data concerning them and/or provided by them and to have the same transmitted to other providers/controllers (cf. also Art. 20 GDPR);
* to file complaints with the supervisory authority if they believe that data concerning them is being processed by the controller in breach of data protection provisions (see also Art. 77 GDPR).

In addition, the controller is obliged to inform all recipients to whom it discloses data of any such corrections, deletions, or restrictions placed on processing the same per Art. 16, 17 Para. 1, 18 GDPR. However, this obligation does not apply if such notification is impossible or involves a disproportionate effort. Nevertheless, users have a right to information about these recipients.

**Likewise, under Art. 21 GDPR, users and data subjects have the right to object to the controller's future processing of their data pursuant to Art. 6 Para. 1 lit. f) GDPR. In particular, an objection to data processing for the purpose of direct advertising is permissible.**

## III. Information about the data processing
Your data processed when using our website will be deleted or blocked as soon as the purpose for its storage ceases to apply, provided the deletion of the same is not in breach of any statutory storage obligations or unless otherwise stipulated below.

### Server data
For technical reasons, the following data sent by your internet browser to us or to our server provider Netlify (2325 3rd St Suite 215, San Francisco, CA 94107) will be collected, especially to ensure a secure and stable website: These server log files record the type and version of your browser, operating system, the website from which you came (referrer URL), the webpages on our site visited, the date and time of your visit, as well as the IP address from which you visited our site. Netlify provides [further information](https://www.netlify.com/gdpr/).

The data thus collected will be temporarily stored, but not in association with any other of your data.

The basis for this storage is Art. 6 Para. 1 lit. f) GDPR. Our legitimate interest lies in the improvement, stability, functionality, and security of our website.

The data will be deleted within no more than 30 days, unless continued storage is required for evidentiary purposes. In which case, all or part of the data will be excluded from deletion until the investigation of the relevant incident is finally resolved.

### Google Analytics
We use Google Analytics on our website. This is a web analytics service provided by Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043 (hereinafter: Google).

Through [certification according to the EU-US Privacy Shield](https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active) Google guarantees that it will follow the EU's data protection regulations when processing data in the United States.

The Google Analytics service is used to analyze how our website is used. The legal basis is Art. 6 Para. 1 lit. f) GDPR. Our legitimate interest lies in the analysis, optimization, and economic operation of our site.

Usage and user-related information, such as IP address, place, time, or frequency of your visits to our website will be transmitted to a Google server in the United States and stored there. However, we use Google Analytics with the so-called anonymization function, whereby Google truncates the IP address within the EU or the EEA before it is transmitted to the US.

The data collected in this way is in turn used by Google to provide us with an evaluation of visits to our website and what visitors do once there. This data can also be used to provide other services related to the use of our website and of the internet in general.

Google states that it will not connect your IP address to other data. In addition, [Google provides further information](https://www.google.com/intl/de/policies/privacy/partners) with regard to its data protection practices, including options you can exercise to prevent such use of your data.

In addition, Google offers an [opt-out add-on](https://tools.google.com/dlpage/gaoptout?hl=en) in addition with further information. This add-on can be installed on the most popular browsers and offers you further control over the data that Google collects when you visit our website. The add-on informs Google Analytics' JavaScript (ga.js) that no information about the website visit should be transmitted to Google Analytics. However, this does not prevent information from being transmitted to us or to other web analytics services we may use as detailed herein.

### Google Fonts
Our website uses Google Fonts to display external fonts. This is a service provided by Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043 (hereinafter: Google).

Through [certification according to the EU-US Privacy Shield](https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active) Google guarantees that it will follow the EU's data protection regulations when processing data in the United States.

To enable the display of certain fonts on our website, a connection to the Google server in the USA is established whenever our website is accessed.

The legal basis is Art. 6 Para. 1 lit. f) GDPR. Our legitimate interest lies in the optimization and economic operation of our site.

When you access our site, a connection to Google is established from which Google can identify the site from which your request has been sent and to which IP address the fonts are being transmitted for display.

Google offers detailed information [[1]](https://adssettings.google.com/authenticated)[[2]](https://policies.google.com/privacy) in particular on options for preventing the use of data.

---------------------

[Model Data Protection Statement](https://www.ratgeberrecht.eu/leistungen/muster-datenschutzerklaerung.html) provided by [Anwaltskanzlei Weiß & Partner](https://www.ratgeberrecht.eu/)
    `}</Markdown>
  );
};
