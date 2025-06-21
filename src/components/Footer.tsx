//******************************************************************************
//    Simple page footer component with copyright info.
//******************************************************************************

import siteinfo from "../siteinfo";

export function Footer({ children }: any) {
  return (
    <div id="footer-wrapper">
      <footer>
        &copy; {siteinfo.copyright.year} {siteinfo.copyright.name}
      </footer>
    </div>
  );
}
