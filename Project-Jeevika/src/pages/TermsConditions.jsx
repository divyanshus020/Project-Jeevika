import React from 'react';
import Footer from '../components/Footer';
const TermsConditions = () => {
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

      <p className="mb-2">Welcome to Jeevika! These terms and conditions outline the rules and regulations for the use of our website.</p>

      <p className="mb-2">By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Jeevika's website if you do not accept all of the terms and conditions stated on this page.</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">License</h2>
      <p className="mb-2">Unless otherwise stated, Jeevika and/or its licensors own the intellectual property rights for all material on Jeevika. All intellectual property rights are reserved. You may view and/or print pages from https://jeevika.com for your own personal use subject to restrictions set in these terms and conditions.</p>

      <p className="mb-2">You must not:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Republish material from Jeevika</li>
        <li>Sell, rent or sub-license material from Jeevika</li>
        <li>Reproduce, duplicate or copy material from Jeevika</li>
        <li>Redistribute content from Jeevika (unless content is specifically made for redistribution).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4 mb-2">User Content</h2>
      <p className="mb-2">Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">Disclaimer</h2>
      <p className="mb-2">To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill). Nothing in this disclaimer will:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>limit or exclude our or your liability for death or personal injury resulting from negligence;</li>
        <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
        <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
        <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
      </ul>


      <h2 className="text-2xl font-semibold mt-4 mb-2">Contact Information</h2>
      <p className="mb-2">If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:codecafe@outlook.com">codecafe@outlook.com</a>.</p>

    </div>
    <Footer/>
    </>
  );
};

export default TermsConditions;

