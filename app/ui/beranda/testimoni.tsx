import React from "react";
import Image from "next/image";

const testimoni = () => {
  return (
    <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm md:mb-12 md:grid-cols-2 bg-white ">
      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e  ">
        <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
          <h3 className="text-lg font-semibold text-gray-900 ">
            Very easy this was to integrate
          </h3>
          <p className="my-4">
            If you care for your time, I hands down would go with this."
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center ">
          <Image
            className="rounded-full w-9 h-9"
            width={500}
            height={500}
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
            alt="profile picture"
          />
          <div className="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
            <div>Bonnie Green</div>
            <div className="text-sm text-gray-500  ">Developer at Open AI</div>
          </div>
        </figcaption>
      </figure>
      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg  ">
        <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
          <h3 className="text-lg font-semibold text-gray-900 ">
            Solid foundation for any project
          </h3>
          <p className="my-4">
            Designing with Figma components that can be easily translated to the
            utility classes of Tailwind CSS is a huge timesaver!"
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center ">
          <Image
            className="rounded-full w-9 h-9"
            width={500}
            height={500}
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
            alt="profile picture"
          />
          <div className="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
            <div>Roberta Casas</div>
            <div className="text-sm text-gray-500 ">
              Lead designer at Dropbox
            </div>
          </div>
        </figcaption>
      </figure>
      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-es-lg md:border-b-0 md:border-e  ">
        <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
          <h3 className="text-lg font-semibold text-gray-900 ">
            Mindblowing workflow
          </h3>
          <p className="my-4">
            Aesthetically, the well designed components are beautiful and will
            undoubtedly level up your next application."
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center ">
          <Image
            className="rounded-full w-9 h-9"
            width={500}
            height={500}
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt="profile picture"
          />
          <div className="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
            <div>Jese Leos</div>
            <div className="text-sm text-gray-500 ">
              Software Engineer at Facebook
            </div>
          </div>
        </figcaption>
      </figure>
      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-se-lg  ">
        <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
          <h3 className="text-lg font-semibold text-gray-900 ">
            Efficient Collaborating
          </h3>
          <p className="my-4">
            You have many examples that can be used to create a fast prototype
            for your team."
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center ">
          <Image
            className="rounded-full w-9 h-9"
            width={500}
            height={500}
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
            alt="profile picture"
          />
          <div className="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
            <div>Joseph McFall</div>
            <div className="text-sm text-gray-500 ">CTO at Google</div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default testimoni;
