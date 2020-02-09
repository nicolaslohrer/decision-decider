/** @jsx jsx */
import { jsx } from "@emotion/core";
import { FC } from "react";
import Markdown from "react-remarkable";

export const Imprint: FC = () => {
  return (
    <Markdown>{`
# Impressum

Information in accordance with Section 5 TMG

Nicolas Schabram ※ Suttnerstraße 12 ※ D-22765 Hamburg

## Contact Information

Telephone: +49 40 72379910

E-Mail: <mail@nicolasschabram.de>

Internet address: <http://decision-decider.com>

## Disclaimer
### Accountability for content

The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages. In this matter, please note that we are not obliged to monitor the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity. Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).

### Accountability for links
Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective link immediately.

### Copyright
Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law, every form of utilizing, reproducing or processing works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights. Individual reproductions of a work are only allowed for private use. The materials from these pages are copyrighted and any unauthorized use may violate copyright laws.

--------------------

Thanks to: [translate-24h.de English Translations](http://www.translate-24h.de/)
    `}</Markdown>
  );
};
