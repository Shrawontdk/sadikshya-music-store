using System.ComponentModel.DataAnnotations;

namespace SadikshyaMusicStoreBackend.DTOs
{
    // ─── AUTH ────────────────────────────────────────────────────────────────────
    public class RegisterDto
    {
        [Required, MaxLength(100)] public string FullName { get; set; } = string.Empty;
        [Required, EmailAddress] public string Email { get; set; } = string.Empty;
        [Required, MinLength(6)] public string Password { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }

    public class LoginDto
    {
        [Required, EmailAddress] public string Email { get; set; } = string.Empty;
        [Required] public string Password { get; set; } = string.Empty;
    }

    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }

    // ─── CATEGORY ────────────────────────────────────────────────────────────────
    public class CategoryDto
    {
        [Required, MaxLength(100)] public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    // ─── PRODUCT ─────────────────────────────────────────────────────────────────
    public class ProductCreateDto
    {
        [Required, MaxLength(150)] public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [Range(0, double.MaxValue)] public decimal Price { get; set; }
        public int Stock { get; set; }
        public string ImageUrl { get; set; } = string.Empty;

        // Dynamic key-value details, e.g. { "Material": "Wood", "Origin": "Nepal" }
        public Dictionary<string, string> Details { get; set; } = new();

        [Required] public int CategoryId { get; set; }
    }

    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public Dictionary<string, string> Details { get; set; } = new();
        public string CategoryName { get; set; } = string.Empty;
        public int CategoryId { get; set; }
    }

    // ─── ORDER ───────────────────────────────────────────────────────────────────
    public class OrderItemCreateDto
    {
        [Required] public int ProductId { get; set; }
        [Range(1, int.MaxValue)] public int Quantity { get; set; }
    }

    public class OrderCreateDto
    {
        [Required] public string ShippingAddress { get; set; } = string.Empty;
        [Required] public string PhoneNumber { get; set; } = string.Empty;
        [Required, MinLength(1)] public List<OrderItemCreateDto> Items { get; set; } = new();
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal LineTotal => Quantity * UnitPrice;
    }

    public class OrderDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public List<OrderItemDto> Items { get; set; } = new();
    }
}