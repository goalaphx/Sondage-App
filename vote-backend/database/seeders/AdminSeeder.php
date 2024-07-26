<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin123@gmail.com',
            'password' => Hash::make('password123'), // Replace 'password' with your desired default password
            'role' => 'Admin', // Or 'admin' depending on your requirements
        ]);
    }
}
