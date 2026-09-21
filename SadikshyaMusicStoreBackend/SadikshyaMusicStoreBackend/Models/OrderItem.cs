using System.ComponentModel.DataAnnotations.Schema;

namespace SadikshyaMusicStoreBackend.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public Order? Order { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public int Quantity { get; set; }

        // Price captured at time of order, so later price changes don't affect old orders
        [Column(TypeName = "decimal(10,2)")]
        public decimal UnitPrice { get; set; }
    }
}