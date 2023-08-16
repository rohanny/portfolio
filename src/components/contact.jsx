import { useState, useRef } from "react";
import emailjs from "emailjs-com";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();
  const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();
    if (
      form.current.from_name.value === "" ||
      form.current.message.value === "" ||
      form.current.user_email.value === ""
    ) {
      toast.error('Empty Value', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } else {
      emailjs
        .sendForm(
          "service_10vthmj",
          "template_x78n0mh",
          form.current,
          publicKey
        )
        .then(
          (result) => {
            toast.success('Message Sent', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          },
          (error) => {
            toast.error('Error', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }
        );
    }
  };

  return (
    <div className="mx-4 sm:mx-28 pb-5" id="contact">
      <ToastContainer/>
      <div className="container mx-auto h-auto px-4 sm:px-20 py-10 border-t border-b border-borderColor">
        <p className="font-satoshi text-3xl sm:text-4xl">Contact Me</p>
        <div className="mx-auto w-auto py-10 flex justify-center">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="font-figtree h-auto space-y-8"
          >
            <div className="flex flex-col space-y-4 mx-6 sm:mx-0">
              <label className="text-xl sm:text-2xl">Name</label>
              <input
                type="name"
                name="from_name"
                className="px-6 sm:px-10 py-4 font-light outline-none border border-gray-50 text-sm sm:text-lg bg-inputBg border-lightGrey"
                placeholder="Anakin Skywalker"
              ></input>
            </div>
            <div className="flex flex-col space-y-4 mx-6 sm:mx-0">
              <label className="text-xl sm:text-2xl">Email</label>
              <input
                type="email"
                name="user_email"
                className="px-6 sm:px-10 py-4 font-light outline-none border border-gray-50 text-sm sm:text-lg bg-inputBg border-lightGrey"
                placeholder="chosenone@skywalker.com"
              ></input>
            </div>
            <div className="flex flex-col space-y-4 mx-6 sm:mx-0">
              <label className="text-xl sm:text-2xl">Message</label>
              <textarea
                type="message"
                name="message"
                className="px-6 sm:px-10 py-4 font-light outline-none border border-gray-50 text-sm sm:text-lg bg-inputBg border-lightGrey"
                placeholder="This is where the fun begins"
              ></textarea>
            </div>
            <div className="px-24">
              <input
                type="submit"
                value="Send"
                className="cursor-pointer px-10 py-4 text-center border border-lightGrey hover:border-lightBlue hover:border-2 hover:text-lightBlue"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
