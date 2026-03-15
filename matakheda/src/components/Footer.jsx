import { FaInstagram, FaYoutube, FaLinkedin, FaPhone, FaGithub, FaEnvelope, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (

    <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white">

      {/* Top border line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Temple name and description */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Matakheda Tukral
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed">
            Maa Navdurga Nagdev Mandir 
             Matakheda Tukral <br/>Block - Makdone, District - Ujjain (M.P.) <br/>

             Thanks for visiting . . . .
          </p>
        </div>


        {/* Social media links */}
        <div>

          <h2 className="text-xl font-semibold mb-4 text-yellow-400">
            Temple Contact
          </h2>

          <div className="flex items-center gap-3 mb-4 text-gray-300">
            <FaPhone className="text-yellow-400"/>
            <span>+91 9630489809</span>
          </div>

          <div className="flex gap-5 text-2xl">

            {/* Instagram link */}
            <a
              href="https://www.instagram.com/matakheda_mandir_tukral?igsh=anl4eDlrcXdhaG83"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              <FaInstagram />
            </a>

            {/* Facebook link */}
            <a
              href="https://www.facebook.com/share/18LVuBtry3/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              <FaFacebook />
            </a>

            {/* YouTube link */}
            <a
              href="https://youtube.com/@matakhedamandirtukral?si=-6GaYA9tc3Diu5jM"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              <FaYoutube />
            </a>

          </div>

        </div>


        {/* Developer credit */}
        <div>

          <h2 className="text-xl font-semibold mb-4 text-yellow-400">
          Developer
        </h2>

        <p className="text-gray-300 mb-4">
       Find me on these platforms
      </p>

          <div className="flex gap-5 text-2xl">

            <a
              href="https://github.com/gopalmakwana2414"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              <FaGithub />
            </a>

            <a
              href="mailto:gopalmakwanatech@gmail.com"
              className="hover:text-yellow-400 transition"
            >
              <FaEnvelope />
            </a>

            <a
              href="https://www.instagram.com/gopal_makwana1"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/in/gopal-makwana-929893291"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              <FaLinkedin />
            </a>

          </div>

        </div>

      </div>


      {/* Copyright line */}
<div className="text-center border-t border-gray-700 py-4 text-sm text-gray-400">

  © {new Date().getFullYear()} Matakheda Mandir Tukral. All Rights Reserved.
  <br />
  Developed by <span className="text-yellow-400 font-semibold">Gopal Makwana</span>

</div>

    </footer>
  );
};

export default Footer;