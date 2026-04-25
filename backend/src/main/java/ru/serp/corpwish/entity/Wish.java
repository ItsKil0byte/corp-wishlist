package ru.serp.corpwish.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "wishes")
public class Wish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "color")
    private String color;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "wishlist_id", referencedColumnName = "id")
    private Wishlist wishlist;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "wish_images", joinColumns = @JoinColumn(name = "wish_id"))
    @Column(name = "file_name")
    @OrderColumn(name = "sort_order")
    private List<String> imageFileNames = new ArrayList<>();

    public List<String> getImageUrls() {
        if(this.imageFileNames != null) {
            return this.imageFileNames.stream()
                    .map(name -> "/uploads/" + name)
                    .toList();
        }
        else {
            return null;
        }
    }
}
