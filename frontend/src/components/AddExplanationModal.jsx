import { useState } from "react";
import Button from "./ui/button";
import { runCode } from "../utils/compilerApi";
// Removed Navbar import; using custom modal header instead

function AddExplanationModal({ onSave, onCancel, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [code, setCode] = useState(initialData?.code || "");
  const [explanation, setExplanation] = useState(initialData?.explanation || "");
  const [language, setLanguage] = useState(initialData?.language || "");
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [outputSuccess, setOutputSuccess] = useState(true);

  // Updated code templates with correct, working examples
  const codeTemplates = {
    Python: `# Python - Basic Calculator
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

# Test the functions
x, y = 5, 3
print(f"Addition: {x} + {y} = {add(x, y)}")
print(f"Multiplication: {x} * {y} = {multiply(x, y)}")`,

    JavaScript: `// JavaScript - Array Operations
const numbers = [1, 2, 3, 4, 5];

const doubleNumbers = (arr) => {
    return arr.map(num => num * 2);
};

const sumNumbers = (arr) => {
    return arr.reduce((sum, num) => sum + num, 0);
};

const doubled = doubleNumbers(numbers);
const sum = sumNumbers(numbers);

console.log("Original:", numbers);
console.log("Doubled:", doubled);
console.log("Sum:", sum);`,

    Java: `// Java - String Manipulation
public class StringDemo {
    public static void main(String[] args) {
        String text = "Hello World";
        
        System.out.println("Original: " + text);
        System.out.println("Uppercase: " + text.toUpperCase());
        System.out.println("Length: " + text.length());
    }
}`,

    "C++": `// C++ - Basic Operations
#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 5;
    
    cout << "a = " << a << ", b = " << b << endl;
    cout << "Sum: " << (a + b) << endl;
    cout << "Product: " << (a * b) << endl;
    
    return 0;
}`,

    "C#": `// C# - Simple Operations
using System;

class Program {
    static void Main() {
        int[] numbers = {1, 2, 3, 4, 5};
        
        Console.WriteLine("Numbers: " + string.Join(", ", numbers));
        
        int sum = 0;
        foreach(int num in numbers) {
            sum += num;
        }
        Console.WriteLine("Sum: " + sum);
    }
}`,

    Go: `// Go - Simple Operations
package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    fmt.Println("Numbers:", numbers)
    
    sum := 0
    for _, num := range numbers {
        sum += num
    }
    fmt.Println("Sum:", sum)
}`,

    Rust: `// Rust - Vector Operations
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    println!("Numbers: {:?}", numbers);
    
    let sum: i32 = numbers.iter().sum();
    println!("Sum: {}", sum);
}`,

    PHP: `<?php
// PHP - Array Operations
$numbers = [1, 2, 3, 4, 5];

echo "Numbers: " . implode(", ", $numbers) . "\\n";

$sum = array_sum($numbers);
echo "Sum: " . $sum . "\\n";
?>`,

    Ruby: `# Ruby - Simple Calculator
numbers = [1, 2, 3, 4, 5]

puts "Numbers: #{numbers.join(', ')}"

sum = numbers.sum
puts "Sum: #{sum}"`,

    Other: `// Generic Programming Template
function demonstrateBasics() {
    let numbers = [1, 2, 3, 4, 5];
    let sum = 0;
    
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    
    console.log("Numbers:", numbers);
    console.log("Sum:", sum);
}

demonstrateBasics();`
  };

  // When language changes, set code template if not editing
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    if (!initialData || !initialData.code) {
      setCode(codeTemplates[lang] || "");
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      setError("Please provide a title for your code explanation.");
      return;
    }
    if (!language.trim()) {
      setError("Please select a language.");
      return;
    }
    if (!code.trim() && !explanation.trim()) return;
    setError("");
    onSave({ name, code, explanation, language });
  };
  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    setOutputSuccess(true);
    try {
      const result = await runCode({ language, code });
      if (result.success) {
        setOutput(result.output || "Code executed successfully!");
        setOutputSuccess(true);
      } else {
        setOutput(result.error || result.output || "Execution failed");
        setOutputSuccess(false);
      }
    } catch (err) {
      console.error("Code execution error:", err);
      setOutput("Error: Unable to execute code. Please try again.");
      setOutputSuccess(false);
    }
    setIsRunning(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-4 animate-in fade-in-0 duration-300" 
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] shadow-2xl relative border-0 flex flex-col overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300 transform">
        {/* Modal Header */}
        <div className="w-full bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
              <span className="text-white text-lg">💻</span>
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">
                {initialData ? 'Edit Code Explanation' : 'Add Code Explanation'}
              </h2>
              <p className="text-blue-100 text-sm">Create detailed code documentation</p>
            </div>
          </div>
          <button 
            onClick={onCancel} 
            className="text-white hover:bg-white/20 p-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center w-9 h-9 group"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex flex-col gap-6 p-8 overflow-y-auto flex-1 bg-gray-50/30">
          {/* Title and Language Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📝 Title
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter a descriptive title for your code explanation"
                className="w-full text-lg font-medium px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔧 Language
              </label>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300 cursor-pointer"
              >
                <option value="">Select Language</option>
                <option value="Python">🐍 Python</option>
                <option value="JavaScript">🟨 JavaScript</option>
                <option value="Java">☕ Java</option>
                <option value="C++">⚡ C++</option>
                <option value="C#">🔷 C#</option>
                <option value="Go">🐹 Go</option>
                <option value="Rust">🦀 Rust</option>
                <option value="PHP">🐘 PHP</option>
                <option value="Ruby">💎 Ruby</option>
                <option value="Other">📝 Other</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="text-red-700 text-sm font-medium bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-red-500">⚠️</span>
              {error}
            </div>
          )}

          {/* Code and Explanation Grid */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Code Section */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 font-semibold text-gray-700">
                    <span className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-sm">
                      &lt;/&gt;
                    </span>
                    Code
                  </label>
                  <Button 
                    onClick={handleRun} 
                    className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      isRunning 
                        ? 'bg-orange-500 hover:bg-orange-600' 
                        : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
                    }`}
                    disabled={isRunning || !language || !code}
                    size="sm"
                  >
                    {isRunning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Running...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Run
                      </>
                    )}
                  </Button>
                </div>
                <textarea
                  rows={14}
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="Paste your code here..."
                  className="border-2 border-gray-200 rounded-xl p-4 font-mono text-sm bg-gray-50 resize-none focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300"
                />
                {output && (
                  <div className={`mt-4 border-2 rounded-xl p-4 text-sm font-mono max-h-40 overflow-auto ${
                    outputSuccess 
                      ? 'bg-gray-900 text-green-400 border-gray-700' 
                      : 'bg-red-900 text-red-200 border-red-700'
                  }`}>
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <span className={`w-2 h-2 rounded-full animate-pulse ${
                        outputSuccess ? 'bg-green-400' : 'bg-red-400'
                      }`}></span>
                      <span className={outputSuccess ? 'text-gray-400' : 'text-red-300'}>
                        {outputSuccess ? 'Output:' : 'Error:'}
                      </span>
                    </div>
                    <pre className={`whitespace-pre-wrap ${
                      outputSuccess ? 'text-green-300' : 'text-red-200'
                    }`}>{output}</pre>
                  </div>
                )}
              </div>

              {/* Explanation Section */}
              <div className="flex flex-col">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">
                    📖
                  </span>
                  Explanation
                </label>
                <textarea
                  rows={14}
                  value={explanation}
                  onChange={e => setExplanation(e.target.value)}
                  placeholder="Write your detailed explanation here..."
                  className="border-2 border-gray-200 rounded-xl p-4 text-sm bg-gray-50 resize-none focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t-2 border-gray-100">
            <Button
              onClick={handleSave}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExplanationModal;
