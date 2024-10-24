import React from "react";
import { TbTruckReturn } from "react-icons/tb";
import about from "../assets/about.png";

const About = () => {
  return (
    <section className="max-padd-container py-12 xl:py-32">
      <div className="flex flex-col gap-16 xl:gap-8 xl:flex-row">
        <div className="flex-1">
          <h3 className="h3 capitalize">
            Unveiling Our Product's key features!
          </h3>
          <p className="py-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel eos
            voluptatem, quisquam odio eius ab error nulla architecto earum
            praesentium vero quod suscipit, fugit, quaerat soluta hic quae nisi
            eveniet!
          </p>
          <div className="flex flex-col items-start gap-y-4">
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondary flexCenter rounded-md">
                <TbTruckReturn className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="medium-18">Easy Returns Process</h4>
                <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus cum, laboriosam at neque consectetur suscipit, maiores
                  quae, inventore architecto repellendus ipsa qui vel explicabo
                  laborum autem ea earum numquam recusandae!
                </p>
              </div>
            </div>
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondary flexCenter rounded-md">
                <TbTruckReturn className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="medium-18">Secury Payment Method</h4>
                <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus cum, laboriosam at neque consectetur suscipit, maiores
                  quae, inventore architecto repellendus ipsa qui vel explicabo
                  laborum autem ea earum numquam recusandae!
                </p>
              </div>
            </div>
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondary flexCenter rounded-md">
                <TbTruckReturn className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="medium-18">Live Customer Support</h4>
                <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus cum, laboriosam at neque consectetur suscipit, maiores
                  quae, inventore architecto repellendus ipsa qui vel explicabo
                  laborum autem ea earum numquam recusandae!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flexCenter">
          <div>
            <img src={about} alt="" width={488} height={488} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
