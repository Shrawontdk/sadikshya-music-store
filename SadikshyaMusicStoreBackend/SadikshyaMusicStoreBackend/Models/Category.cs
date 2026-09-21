using System.ComponentModel.DataAnnotations;

namespace SadikshyaMusicStoreBackend.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty; // e.g. "Traditional Nepali Instruments", "Guitars"

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        // Navigation
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}