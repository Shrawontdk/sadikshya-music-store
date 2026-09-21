using System.Text.Json;
using SadikshyaMusicStoreBackend.Models;

namespace SadikshyaMusicStoreBackend.Data
{
    public static class DataSeeder
    {
        public static void Seed(AppDbContext context)
        {
            SeedAdminUser(context);
            SeedCategoriesAndProducts(context);
        }

        private static void SeedAdminUser(AppDbContext context)
        {
            // Only create an admin if none exists yet — safe to run on every startup
            bool adminExists = context.Users.Any(u => u.Role == "Admin");
            if (adminExists) return;

            var admin = new User
            {
                FullName = "Admin",
                Email = "admin@gmail.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin@123"),
                Role = "Admin"
            };

            context.Users.Add(admin);
            context.SaveChanges();
        }

        private static void SeedCategoriesAndProducts(AppDbContext context)
        {
            // Only seed if the database is empty — avoids duplicate rows on every restart
            if (context.Categories.Any()) return;

            var traditional = new Category { Name = "Traditional Nepali Instruments", Description = "Handmade instruments rooted in Nepali heritage" };
            var guitars = new Category { Name = "Guitars", Description = "Acoustic and electric guitars" };
            var keyboards = new Category { Name = "Keyboards & Pianos", Description = "Digital pianos and keyboards" };
            var percussion = new Category { Name = "Drums & Percussion", Description = "Drums and hand percussion" };
            var strings = new Category { Name = "Strings & Accessories", Description = "Strings, picks, straps and accessories" };

            context.Categories.AddRange(traditional, guitars, keyboards, percussion, strings);
            context.SaveChanges();

            string Json(object obj) => JsonSerializer.Serialize(obj);

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Madal",
                    Description = "The heartbeat of Nepali folk music — a traditional hand drum played at every celebration.",
                    Price = 85.00m,
                    Stock = 12,
                    ImageUrl = "/images/madal.jpg",
                    CategoryId = traditional.Id,
                    DetailsJson = Json(new Dictionary<string, string>
                    {
                        { "Material", "Goat skin & Khirro wood" },
                        { "Origin", "Nepal" },
                        { "Size", "45 cm length" },
                        { "Weight", "2.1 kg" }
                    })
                },
                new Product
                {
                    Name = "Dhime",
                    Description = "A large cylindrical drum central to Newari festival music, played with hands and a stick.",
                    Price = 120.00m,
                    Stock = 6,
                    ImageUrl = "/images/dhime.jpg",
                    CategoryId = traditional.Id,
                    DetailsJson = Json(new Dictionary<string, string>
                    {
                        { "Material", "Buffalo hide & wood" },
                        { "Origin", "Kathmandu Valley, Nepal" },
                        { "Size", "60 cm length" }
                    })
                },
                new Product
                {
                    Name = "Dhamphu",
                    Description = "A single-headed frame drum popular in Tamang selo folk songs.",
                    Price = 45.00m,
                    Stock = 15,
                    ImageUrl = "/images/dhamphu.jpg",
                    CategoryId = traditional.Id,
                    DetailsJson = Json(new Dictionary<string, string>
                    {
                        { "Material", "Goat skin & wood frame" },
                        { "Origin", "Nepal" },
                        { "Diameter", "30 cm" }
                    })
                },
                new Product
                {
                    Name = "Sarangi",
                    Description = "A four-stringed bowed instrument, the soulful voice of Nepali folk storytelling.",
                    Price = 150.00m,
                    Stock = 5,
                    ImageUrl = "/images/sarangi.jpg",
                    CategoryId = traditional.Id,
                    DetailsJson = Json(new Dictionary<string, string>
                    {
                        { "Material", "Khirro wood, goat skin" },
                        { "Strings", "4" },
                        { "Origin", "Gandaki Province, Nepal" }
                    })
                },
                new Product
                {
                    Name = "Murchunga",
                    Description = "A small metal jaw harp producing a distinctive twanging resonance.",
                    Price = 15.00m,
                    Stock = 30,
                    ImageUrl = "/images/murchunga.jpg",
                    CategoryId = traditional.Id,
                    DetailsJson = Json(new Dictionary<string, string>
                    {
                        { "Material", "Iron" },
                        { "Origin", "Nepal" },
                        { "Length", "10 cm" }
                    })
                },
                new Product
                {
                    Name = "Acoustic Guitar - Dreadnought",
                    Description = "Full-bodied dreadnought acoustic guitar, great for strumming and fingerstyle.",
                    Price = 199.00m,
                    Stock = 10,
                    ImageUrl = "/images/acoustic-guitar.jpg",
                    CategoryId = guitars.Id,
                    DetailsJson = Json(new Dictionary<string, string>
                    {
                        { "Body", "Dreadnought" },
                        { "Top Wood", "Spruce" },
                        { "Strings", "6" }
                    })
                },
                new Product
                {
                    Name = "Electric Guitar - Stratocaster Style",
                    Description = "Versatile electric guitar with a classic double-cutaway body.",
                    Price = 349.00m,
                    Stock = 8,
                    ImageUrl = "/images/electric-guitar.jpg",
                    CategoryId = guitars.Id,
                    DetailsJson = Json(new Dictionary<string, string>
                    {
                        { "Body", "Alder" },
                        { "Pickups", "3x Single Coil" },
                        { "Strings", "6" }
                    })
                },
                new Product
                {
                    Name = "61-Key Digital Keyboard",
                    Description = "Beginner-friendly digital keyboard with built-in speakers and lesson mode.",
                    Price = 129.00m,
                    Stock = 14,
                    ImageUrl = "/images/keyboard.jpg",
                    CategoryId = keyboards.Id,
                    DetailsJson = Json(new Dictionary<string, string>
                    {
                        { "Keys", "61, touch-sensitive" },
                        { "Power", "AC adapter / batteries" }
                    })
                },
                new Product
                {
                    Name = "5-Piece Drum Kit",
                    Description = "Standard 5-piece acoustic drum kit with cymbals included.",
                    Price = 499.00m,
                    Stock = 4,
                    ImageUrl = "/images/drum-kit.jpg",
                    CategoryId = percussion.Id,
                    DetailsJson = Json(new Dictionary<string, string>
                    {
                        { "Pieces", "5 drums + cymbals" },
                        { "Shell Material", "Poplar" }
                    })
                },
                new Product
                {
                    Name = "Acoustic Guitar String Set",
                    Description = "Bronze wound acoustic guitar strings, light gauge.",
                    Price = 9.00m,
                    Stock = 50,
                    ImageUrl = "/images/guitar-strings.jpg",
                    CategoryId = strings.Id,
                    DetailsJson = Json(new Dictionary<string, string>
                    {
                        { "Gauge", "Light (.012-.053)" },
                        { "Material", "80/20 Bronze" }
                    })
                }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}