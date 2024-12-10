/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import { useState } from "react";
import config from "/CONFIG.json";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaTwitter,
} from "react-icons/fa";

const SocialIcon = ({ name }) => {
  const iconMap = {
    github: FaGithub,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
    email: FaEnvelope,
    twitter: FaTwitter,
  };

  const Icon = iconMap[name.toLowerCase()] || FaEnvelope;
  return <Icon className="w-6 h-6" />;
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="c-cursor-text text-3xl font-bold text-center mb-10">
        Contact Me
      </h1>

      <div className="flex justify-center space-x-6 mb-12">
        {config.pages.contact.social_links.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
            title={social.name}
          >
            <SocialIcon name={social.icon} />
          </a>
        ))}
      </div>

      {config.pages.contact.contact_form.enabled && (
        <form
          onSubmit={handleSubmit}
          className="bg-black/50 shadow-md rounded-lg p-8 space-y-6"
        >
          {config.pages.contact.contact_form.fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-gray-700 font-medium mb-2"
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="c-cursor-text w-full px-3 py-2 border bg-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="4"
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="c-cursor-text w-full px-3 py-2 border bg-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="c-cursor-pointer w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Send Message
          </button>
        </form>
      )}

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Reach Me Directly</h2>
        <a
          href={`mailto:${config.pages.contact.email}`}
          className="text-primary hover:underline flex items-center justify-center gap-2"
        >
          <FaEnvelope className="inline-block" />
          {config.pages.contact.email}
        </a>
      </div>
    </div>
  );
}
