# Anime Review Web Application

As a part of 01204351-65 Database System subject at the Computer Engineering department of Kasetsart University

This project is web application similar to MyAnimeList. The application allows students to manage their anime watchlist, keep track of watched episodes, and discover new anime titles. It's built with Next.js, Tailwind CSS, Shadcn UI, and Supabase.


**Deploy (Look best on mobile!):** https://anime-review.vercel.app/

**Presentation:** https://www.canva.com/design/DAF-f7VsPG8/CFuLs3t7tLG71vs-3ZzIpw/edit?utm_content=DAF-f7VsPG8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## Features

- **User Authentication**: Users can sign up, log in, and log out securely using Supabase authentication.
- **Anime Listing**: Users can browse through a vast collection of anime titles fetched from an API or database.
- **Bookmark Management**: Users can add anime to their Bookmark and mark them as watched or favorite.
- **Search and Filters**: Users can search for specific anime titles and apply filters based on genres, ratings, and release years.
- **Responsive Design**: The application is designed to be responsive, ensuring a seamless experience across devices.
- **Comments and likes**: Users can comment on any anime and also can like other people comment. 
- **Dark Mode**: The application supports a dark mode feature for improved readability and reduced eye strain.

## Data Source

The anime data for this project is sourced from the [MyAnimeList Anime Dataset](https://www.kaggle.com/datasets/andreuvallhernndez/myanimelist) available on Kaggle. This dataset contains comprehensive information about various anime titles, including their titles, genres, ratings, popularity, and more. The data is used to populate the anime listing and enable users to explore and discover new anime titles within the application.

## Technologies Used

- **Next.js**: Next.js is a React framework for building server-side rendered and statically generated web applications.
- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework for quickly building custom designs without writing CSS.
- **Shadcn UI**: Shadcn UI is a UI component library built on top of Tailwind CSS, providing pre-designed components for faster development.
- **Supabase**: Supabase is an open-source alternative to Firebase, providing authentication, database, and storage services.
- **Flowbite and Next UI** both are UI component libary we use secondary after shadcn ui. 

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using `git clone`.
2. **Install Dependencies**: Navigate to the project directory and install the dependencies using `npm install`.
3. **Set Up Supabase**: Sign up for a Supabase account and create a new project. Configure authentication and database settings according to your requirements. Retrieve your Supabase URL and API key.
4. **Environment Variables**: Create a `.env.local` file in the root directory of the project and add the following environment variables:

    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_api_key
    ```

5. **Run the Application**: Start the development server using `npm run dev`.
6. **Access the Application**: Open your web browser and navigate to `http://localhost:3000` to access the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project was inspired by [MyAnimeList](https://myanimelist.net/).
- Special thanks to the creators and maintainers of Next.js, Tailwind CSS, Shadcn UI, and Supabase for their amazing tools and libraries.

---

Feel free to customize this README according to your project's specific details and requirements. If you have any questions or need further assistance, don't hesitate to reach out!

## Our Team

1. 6510503581 นายพลพล พัวกาหลง
2. 6510503611 นายพัทธดนย์ ตันติเอมอร
3. 6510503671 นายภาณุพงศ์ เลิศวีรนนทรัตน์
4. 6510503778 นายวีรภัทร์ อุ่นอบ
5. 6510503786 นายศักย์ศรณ์ มาลาสุทธิชัย


## Screenshots

![image](https://github.com/inspirezuza/anime-review/assets/102022496/b4fe091d-1cfa-4d2f-914d-e5941d2cbef1)


