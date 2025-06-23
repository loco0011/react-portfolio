import emailjs from 'emailjs-com';

export const sendAdminAlert = () => {
  return emailjs.send(
    'service_m98e6w9',
    'template_nb6c0nj',
    {
      from_name: 'Auto Monitor',
      from_email: 'samrbit1.1@gmail.com',
      message: 'Your portfolio site failed to load. Redirected user to old site. Please fix it ASAP.',
    },
    'qawppm_LXjSHjadm7'
  );
};
