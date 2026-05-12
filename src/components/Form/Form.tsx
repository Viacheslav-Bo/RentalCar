"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import css from "./Form.module.css";

type Props = {
  carId: string;
};

const Form = ({ carId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const form = event.currentTarget;
    // const formData = new FormData(form);

    // const data = {
    //   carId,
    //   name: formData.get("name"),
    //   email: formData.get("email"),
    //   bookingDate: formData.get("bookingDate"),
    //   comment: formData.get("comment"),
    // };

    try {
      setIsLoading(true);

      toast.success("Car booked successfully!");
      event.currentTarget.reset();

      //   form.reset();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={css.booking}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="name"
          placeholder="Name*"
          required
        />

        <input
          className={css.input}
          type="email"
          name="email"
          placeholder="Email*"
          required
        />

        <input
          className={css.input}
          type="text"
          name="bookingDate"
          placeholder="Booking date"
        />

        <textarea
          className={css.textarea}
          name="comment"
          placeholder="Comment"
        />

        <button
          className={`btn ${css.button}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
};

export default Form;
