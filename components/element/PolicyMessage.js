import React, { useEffect, useState } from "react";
import styles from "/styles/PolicyMessage.module.css";

const PolicyMessage = (props) => {
  return (
    <div className={styles.policyContainer}>
      {props && props.policy == "terms-and-condition" && (
        <>
          <h1 className={styles.heading}>Terms & condition</h1>
          <p className={styles.para}>
            The Website Owner, including subsidiaries and affiliates
            (“brarscribbles.com” or “” or “we” or “us” or “our”) provides the
            information contained on the website or any of the pages comprising
            the website (“website”) to visitors (“visitors”) (cumulatively
            referred to as “you” or “your” hereinafter) subject to the terms and
            conditions set out in these website terms and conditions, the
            privacy policy and any other relevant terms and conditions, policies
            and notices which may be applicable to a specific section or module
            of the website. Terms & Conditions – sample template Welcome to
            brarscribbles.com If you continue to browse and use this website you
            are agreeing to comply with and be bound by the following terms and
            conditions of use, which together with our privacy policy govern
            brarscribbles.com’s relationship with you in relation to this
            website. The term ” brarscribbles.com’ or ‘us’ or ‘we’ refers to the
            owner of the website whose registered office is . The term ‘you’
            refers to the user or viewer of our website. The use of this website
            is subject to the following terms of use: The content of the pages
            of this website is for your general information and use only. It is
            subject to change without notice. Neither we nor any third parties
            provide any warranty or guarantee as to the accuracy, timeliness,
            performance, completeness or suitability of the information and
            materials found or offered on this website for any particular
            purpose. You acknowledge that such information and materials may
            contain inaccuracies or errors and we expressly exclude liability
            for any such inaccuracies or errors to the fullest extent permitted
            by law. Your use of any information or materials on this website is
            entirely at your own risk, for which we shall not be liable. It
            shall be your own responsibility to ensure that any products,
            services or information available through this website meet your
            specific requirements. This website contains material which is owned
            by or licensed to us. This material includes, but is not limited to,
            the design, layout, look, appearance and graphics. Reproduction is
            prohibited other than in accordance with the copyright notice, which
            forms part of these terms and conditions. All trade marks reproduced
            in this website which are not the property of, or licensed to, the
            operator are acknowledged on the website. Unauthorised use of this
            website may give rise to a claim for damages and/or be a criminal
            offence. From time to time this website may also include links to
            other websites. These links are provided for your convenience to
            provide further information. They do not signify that we endorse the
            website(s). We have no responsibility for the content of the linked
            website(s). You may not create a link to this website from another
            website or document without ‘s prior written consent. Your use of
            this website and any dispute arising out of such use of the website
            is subject to the laws of India or other regulatory authority.
          </p>
        </>
      )}
      {props && props.policy == "privacy" && (
        <>
          <h1 className={styles.heading}>Privacy Policy</h1>
          <p className={styles.para}>
            This privacy policy sets out how brarscribbles.com uses and protects
            any information that you give brarscribbles.com when you use this
            website brarscribbles.com is committed to ensuring that your privacy
            is protected Should we ask you to provide certain information by
            which you can be identified when using this website, then you can be
            assured that it will only be used in accordance with this privacy
            statement. <br />
            brarscribbles.com may change this policy from time to time by
            updating this page. You should check this page from time to time to
            ensure that you are happy with any changes. This policy is from May
            18, 2020 <br />
            What we collect <br />
            We may collect the following information: <br />
            name and date of birth contact information including email address
            demographic information such as postcode, preferences and interests
            other information relevant to customer surveys and/or offers What we
            do with the information we gather We require this information to
            understand your needs and provide you with a better service, and in
            particular for the following reasons: Internal record keeping. We
            may use the information to improve our products and services. <br />
            We may periodically send promotional emails about new products
            special offers or other information which we think you may find
            interesting using the email address which you have provided. From
            time to time. we may also use your information to contact you for
            market research purposes. We may contact you by email, phone, fax or
            mail. We may use the information to customise the website according
            to your interests.
          </p>
        </>
      )}
      {props && props.policy == "disclaimer" && (
        <>
          <h1 className={styles.heading}>Disclaimer</h1>
          <p className={styles.para}>
            The information contained in this website is for general information
            purposes only. The information is provided by
            brar-scribbles.stores.instamojo.com and while we endeavour to keep
            the information up to date and correct, we make no representations
            or warranties of any kind, express or implied, about the
            completeness, accuracy, reliability, suitability or availability
            with respect to the website or the information, products, services,
            or related graphics contained on the website for any purpose. Any
            reliance you place on such information is therefore strictly at your
            own risk. In no event will we be liable for any loss or damage
            including without limitation, indirect or consequential loss or
            damage, or any loss or damage whatsoever arising from loss of data
            or profits arising out of, or in connection with, the use of this
            website. Through this website you are able to link to other websites
            which are not under the control of
          </p>
        </>
      )}
      {props && props.policy == "refund-and-cancelation" && (
        <>
          <h1 className={styles.heading}>Refund & Cancelation</h1>
          <p className={styles.para}>
            The information contained in this website is for general information
            purposes only. The information is provided by brarscribbles.com and
            while we endeavour to keep the information up to date and correct,
            we make no representations or warranties of any kind, express or
            implied, about the completeness, accuracy, reliability, suitability
            or availability with respect to the website or the information,
            products, services, or related graphics contained on the website for
            any purpose. Any reliance you place on such information is therefore
            strictly at your own risk. In no event will we be liable for any
            loss or damage including without limitation, indirect or
            consequential loss or damage, or any loss or damage whatsoever
            arising from loss of data or profits arising out of, or in
            connection with, the use of this website. Through this website you
            are able to link to other websites which are not under the control
            brarscribbles.com. We have no control over the nature, content and
            availability of those sites. The inclusion of any links does not
            necessarily imply a recommendation or endorse the views expressed
            within them. Every effort is made to keep the website up and running
            smoothly. However, brarscribbles.com takes no responsibility for,
            and will not be liable for, the website being temporarily
            unavailable due to technical issues beyond our control.
          </p>
        </>
      )}
    </div>
  );
};

export default PolicyMessage;
