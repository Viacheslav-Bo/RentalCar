"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { bookingRequest } from "@/src/lib/api";

import css from "./Form.module.css";

type Props = {
  carId: string;
};

const Form = ({ carId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      // bookingDate: formData.get("bookingDate") as string,
      comment: formData.get("comment") as string,
    };

    try {
      setIsLoading(true);

      await bookingRequest(carId, data);

      toast.success("Car booked successfully!");

      form.reset();
    } catch (error) {
      toast.error("Failed to send booking");
      console.log(error);
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

        <input className={css.input} type="date" name="bookingDate" />

        <textarea
          className={css.textarea}
          name="comment"
          placeholder="Comment"
          required
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
