'use client'

import Link from "next/link"
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import PageHeader from "@/components/pageHeader";

export default function Page() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
            const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
            const { data: recipes, error } = await supabase
                .from('recipes')
                .select('*');

            if (error) {
                console.error('Error fetching recipes:', error);
            } else {
                setRecipes(recipes);
            }
        };
    
        fetchRecipes();
    }, []);

    return (
        <div className="min-h-full flex flex-col items-center">
            <PageHeader header={'Recipes'} description={'Browse through recipes available'} img={"url('/images/4.avif')"} />
            <div className="min-h-full">
                <h1>gvhbjn</h1>
                {recipes.map((recipe) => {
                    <div key={recipe.recipe_id} className="bg-gray-100 rounded-lg p-2 my-4">
                        <div className="grid grid-cols-2 gap-8">
                            {/* <img src={recipe.imgurl} className="rounded-3xl" alt="Chickpea" width={300} /> */}
                            <div>
                                <h2 className="text-2xl font-bold">{recipe.recipe_title}</h2>
                                <ul className="text-xs">
                                    {recipe.recipe_ingredients.map((ingredient) => {
                                        <li>{ingredient}</li>
                                    })}
                                </ul>
                                <Link href={`/recipes/${recipe.recipe_id}`}>View Recipe</Link>
                            </div>
                        </div>
                    </div>
                })}
                
            </div>
        </div>
    )
}