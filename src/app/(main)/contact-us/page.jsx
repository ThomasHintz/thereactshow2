import { redirect } from 'next/navigation';
import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';

import { Container } from '@/components/Container'

export default async function Page({ searchParams }) {
  const firstName = searchParams['first-name'];
  const lastName = searchParams['last-name'];
  const email = searchParams['email'];
  const message = searchParams['message'];
  const submitted = firstName || lastName || email || message;
  const valid = submitted && firstName && lastName && email && message;
  let emailSentSuccessfully = false;

  if (valid) {
    const transporter = nodemailer.createTransport({
      host: process.env.CONTACT_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.CONTACT_USER,
        pass: process.env.CONTACT_PASSWORD,
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${process.env.CONTACT_FROM_ADDRESS}>`,
      replyTo: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.CONTACT_TO_ADDRESS,
      subject: "The React Show - Form Submission",
      text: message,
      html: sanitizeHtml(message, {
        allowedTags: [],
        allowedAttributes: {}
      }),
    });
    redirect('/contact-success')
  }

  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          Contact Us
        </h1>
        {valid && !emailSentSuccessfully && (
           <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
             <p>
               Unable to send message. Please go back and reload the page and try again or try again later. Sorry!
             </p>
           </div>
        )}
        {!valid && (
           <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
             <p className="mt-4 italic">
               Like the show? Want to hear us talk about something specific? Or just want to say hi? We’d love to hear from you!
             </p>
             <form className="space-y-8">
               <div className="space-y-8">
                 <div className="pt-8">
                   <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                     <div className="sm:col-span-3">
                       <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                         First name
                       </label>
                       <div className="mt-1">
                         <input
                           type="text"
                           name="first-name"
                           id="first-name"
                           autoComplete="given-name"
                           defaultValue={firstName}
                           required
                           title="First/Given Name (required)"
                           className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-gray-300"
                         />
                       </div>
                     </div>

                     <div className="sm:col-span-3">
                       <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                         Last name
                       </label>
                       <div className="mt-1">
                         <input
                           type="text"
                           name="last-name"
                           id="last-name"
                           autoComplete="family-name"
                           defaultValue={lastName}
                           required
                           title="Last/Family Name (required)"
                           className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                         />
                       </div>
                     </div>

                     <div className="sm:col-span-4">
                       <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                         Email address
                       </label>
                       <div className="mt-1">
                         <input
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="email"
                           required
                           defaultValue={email}
                           title="Email Address (required)"
                           className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                         />
                       </div>
                     </div>

                   </div>
                 </div>

                 <div className="sm:col-span-6">
                   <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                     Your Message
                   </label>
                   <div className="mt-1">
                     <textarea
                       id="message"
                       name="message"
                       rows={3}
                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       defaultValue={message}
                       required
                       title="Your message to us! (required)"
                     />
                   </div>
                 </div>
               </div>

               <div className="pt-5">
                 <div className="flex justify-end">
                   <button
                     type="submit"
                     className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                   >
                     Send
                   </button>
                 </div>
               </div>
             </form>
           </div>
        )}
      </Container>
    </div>
  );
}
